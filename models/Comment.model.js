const { Schema, model } = require("mongoose");

const commentSchema = new Schema(
  {
    username: String,
    sentence: String,
  },
  {
    timestamps: true,
  }
);

const CommentModel = model("Comments", commentSchema);

module.exports = CommentModel;