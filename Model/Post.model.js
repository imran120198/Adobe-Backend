const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    content: { type: String, required: true, minlength: 1, maxlength: 300 },
    likes: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

const PostModel = mongoose.model("posts", PostSchema);

module.exports = {
  PostModel,
};
