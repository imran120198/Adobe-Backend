const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, minlength: 1, maxlength: 50 },
    email: { type: String, required: true, unique: true },
    bio: { type: String, maxlength: 200 },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model("user", UserSchema);

module.exports = {
  UserModel,
};
