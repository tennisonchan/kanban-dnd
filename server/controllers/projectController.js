const mongoose = require("mongoose");
const async = require("async");
const Project = require("../models/project");
const Column = require("../models/column");
const Note = require("../models/note");

exports.projects_read = function (req, res, next) {
  const { id: ownerId } = req.user;
  Project.find({ ownerId }, "id name").exec(function (err, projects) {
    if (err) {
      return next(err);
    }
    res.json({ projectList: projects });
  });
};

exports.project_read = function (req, res, next) {
  console.log("project_read", req.params.id);
  const projectId = mongoose.Types.ObjectId(req.params.id);

  async.parallel(
    {
      project: function (callback) {
        Project.findById(projectId, "columnOrder noteOrders").exec(callback);
      },
      columns: function (callback) {
        Column.find({ projectId }, "id name").exec(callback);
      },
      notes: function (callback) {
        Note.find({ projectId }).exec(callback);
      },
    },
    function (err, results) {
      if (err || !results.project) return next(err);

      const { project } = results;
      const { columnOrder, noteOrders } = project;
      const columns = results.columns.reduce(
        (acc, col) => ({ ...acc, [col.id]: col }),
        {}
      );
      const notes = results.notes.reduce(
        (acc, note) => ({ ...acc, [note.id]: note }),
        {}
      );
      console.log({ columnOrder, noteOrders, columns, notes });
      res.json({ id: projectId, columnOrder, noteOrders, columns, notes });
    }
  );
};

exports.project_create = function (req, res, next) {
  console.log("project_create");
  const { id: ownerId } = req.user;
  const project = new Project({
    name: req.body.name,
    ownerId,
  });
  project.save((err) => {
    if (err) return next(err);
    res.json({ project });
  });
};

exports.project_update = function (req, res, next) {
  const { id: projectId, name, columnOrder, noteOrders } = req.body;

  console.log("project_update", { projectId });
  Project.findOneAndUpdate(
    { _id: projectId },
    {
      name,
      columnOrder,
      noteOrders,
    },
    { new: true },
    (err, project) => {
      if (err) {
        return next(err);
      }
      res.json({ project });
    }
  );
};

exports.project_delete = function (req, res, next) {
  const projectId = mongoose.Types.ObjectId(req.params.id);
  console.log("project_delete", { projectId });
  Project.findOneAndDelete(projectId, (err, project) => {
    if (err) {
      return next(err);
    }
    res.json({ project });
  });
};
