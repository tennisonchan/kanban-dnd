const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema(
  {
    terraAddress: { type: String, required: true, index: true },
  },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

UserSchema.statics.findOneOrCreate = function (condition, callback) {
  this.findOne(condition, (err, result) => {
    console.log("findOne", result);
    return !!result
      ? callback(err, result)
      : this.create(condition, (err, result) => {
          console.log("create", result);
          return callback(err, result);
        });
  });
};

module.exports = mongoose.model("User", UserSchema);
