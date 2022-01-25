const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProjectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    columnOrder: [{ type: String, default: [] }],
    noteOrders: { type: Object, default: {} },
  },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

module.exports = mongoose.model("Project", ProjectSchema);
