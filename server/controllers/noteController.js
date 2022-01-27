const mongoose = require("mongoose");
const async = require("async");
const Note = require("../models/note");
const Project = require("../models/project");

exports.note_read = function (req, res, next) {
  const noteId = mongoose.Types.ObjectId(req.params.id);
  Note.findById(noteId, function (err, note) {
    res.json({ note });
  });
};

exports.note_create = function (req, res, next) {
  const { name, projectId, content, status, archived, columnId } = req.body;
  console.log("note_create", { projectId, columnId });
  const note = new Note({
    name,
    projectId,
    content,
    status,
    archived,
  });

  note.save((err) => {
    if (err) return next(err);

    Project.findById(projectId, "noteOrders", function (err, project) {
      const noteOrders = {
        ...project.noteOrders,
        [columnId]: [...(project.noteOrders[columnId] || []), note.id],
      };
      project.noteOrders = noteOrders;
      project.save();
      console.log({ id: note._id, noteOrders });
      res.json({ note, noteOrders });
    });
  });
};

exports.note_update = function (req, res, next) {
  const { id, name, projectId, content, status, archived, columnId } = req.body;
  console.log("note_update", { noteId: id });
  Note.findOneAndUpdate(
    { _id: id },
    {
      name,
      projectId,
      content,
      status,
      archived,
    },
    { new: true },
    function (err, note) {
      if (err) return next(err);
      return res.json({ note });
    }
  );
};

exports.note_delete = function (req, res, next) {
  const columnId = mongoose.Types.ObjectId(req.params.columnId);
  const noteId = mongoose.Types.ObjectId(req.params.noteId);
  console.log("note_delete", { columnId, noteId });

  Note.findById(noteId).exec(function (err, note) {
    if (err || !note) return next(err);
    const { projectId } = note;

    Project.findById(projectId, "noteOrders").exec(function (err, project) {
      if (err || !project) return next(err);
      const noteOrder = project.noteOrders[columnId] || [];
      project.noteOrders = {
        ...project.noteOrders,
        [columnId]: noteOrder.filter((id) => id !== note.id),
      };
      project.save();
      note.delete();
      return res.json({ note, noteOrders: project.noteOrders });
    });
  });
};

exports.note_archive = function (req, res, next) {
  const { projectId, columnId, noteId } = req.body;
  console.log("note_archive", { noteId });
  async.parallel(
    {
      note: function (callback) {
        Note.findById(noteId).exec(callback);
      },
      project: function (callback) {
        Project.findById(projectId).exec(callback);
      },
    },
    function (err, results) {
      if (err) return next(err);
      const { project, note } = results;
      note.archived = true;
      note.save();

      const noteOrder = project.noteOrders[columnId] || [];
      project.noteOrders = {
        ...project.noteOrders,
        [columnId]: noteOrder.filter((id) => id !== note.id),
      };
      project.save();

      return res.json({ note, noteOrders: project.noteOrders });
    }
  );
};

exports.notes_reorder = function (req, res, next) {
  const { noteOrders, projectId } = req.body;
  console.log("notes_reorder");

  Project.findById(projectId).exec(function (err, project) {
    project.noteOrders = noteOrders;
    project.save();

    return res.json({ noteOrders, projectId });
  });
};
