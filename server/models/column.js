const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ColumnSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    project: {
      type: Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
  },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

module.exports = mongoose.model("Column", ColumnSchema);
