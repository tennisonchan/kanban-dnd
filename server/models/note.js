const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NoteSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    content: { type: String },
    status: { type: String, enum: ["open", "closed"], default: "open" },
    archived: { type: Boolean, default: false },
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

module.exports = mongoose.model("Note", NoteSchema);
