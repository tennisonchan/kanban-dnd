const mongoose = require("mongoose");
const Column = require("../models/column");
const Project = require("../models/project");

exports.column_read = function (req, res, next) {
  const columnId = mongoose.Types.ObjectId(req.params.id);
  Column.findById(columnId, function (err, column) {
    res.json({ column });
  });
};

exports.column_create = function (req, res, next) {
  const { name, projectId } = req.body;
  console.log("column_update", { projectId });
  const column = new Column({ name, projectId });

  column.save((err) => {
    if (err) {
      return next(err);
    }
    Project.findById(projectId, "columnOrder", function (err, doc) {
      const columnOrder = [...doc.columnOrder, column._id];
      doc.columnOrder = columnOrder;
      doc.save();
      console.log({ id: column._id, columnOrder });
      res.json({ column, columnOrder });
    });
  });
};

exports.column_update = function (req, res, next) {
  const { id, name, projectId } = req.body;
  console.log("column_update", { id, projectId });
  Column.findOneAndUpdate(
    { _id: id },
    {
      name,
      projectId,
    },
    { new: true },
    function (err, column) {
      if (err) return next(err);
      return res.json({ column });
    }
  );
};

exports.column_delete = function (req, res, next) {
  const columnId = mongoose.Types.ObjectId(req.params.id);
  console.log("column_delete", { columnId });
  Column.findById(columnId).exec(function (err, column) {
    if (err || !column) return next(err);
    const { projectId } = column;

    Project.findById(projectId, "columnOrder noteOrders").exec(function (
      err,
      project
    ) {
      if (err || !project) return next(err);
      const columnOrder = project.columnOrder.filter((id) => id !== column.id);
      project.columnOrder = columnOrder;
      const noteOrders = { ...project.noteOrders };
      delete noteOrders[columnId];
      project.noteOrders = noteOrders;
      project.save();
      column.delete();
      return res.json({ column, noteOrders, columnOrder });
    });
  });
};

exports.columns_reorder = function (req, res, next) {
  const { columnOrder, projectId } = req.body;
  console.log("columns_reorder");

  Project.findById(projectId).exec(function (err, project) {
    project.columnOrder = columnOrder;
    project.save();

    return res.json({ columnOrder, projectId });
  });
};
