const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProjectSchema = new mongoose.Schema(
  {
    id: { type: Schema.Types.ObjectId },
    name: { type: String, required: true },
    columnOrder: [{ type: String, default: [] }],
    noteOrders: { type: Object, default: {} },
  },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

// ProjectSchema.virtual("id").get(() => this._id.toHexString());

module.exports = mongoose.model("Project", ProjectSchema);
