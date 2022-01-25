const mongoose = require("mongoose");
const async = require("async");
const Project = require("../models/project");
const Column = require("../models/column");
const Note = require("../models/note");

exports.projects_read = function (req, res, next) {
  console.log("projects_read");
  Project.find({}, "name").exec(function (err, projects) {
    if (err) {
      return next(err);
    }
    res.json({ projects });
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
        Column.find({ project: projectId }, "id name").exec(callback);
      },
      notes: function (callback) {
        Note.find({ project: projectId }).exec(callback);
      },
    },
    function (err, results) {
      if (err) {
        return next(err);
      }

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
  const project = new Project({
    name: req.body.name,
  });
  project.save((err) => {
    console.log("2", err);
    if (err) {
      return next(err);
    }
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