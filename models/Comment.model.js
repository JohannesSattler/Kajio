const { Schema, model } = require("mongoose");

const commentSchema = new Schema(
  {
    username: {
      type: String,
      require: true,
    },
    sentence: String,
  },
  {
    timestamps: true,
  }
);

const CommentModel = model("Comments", commentSchema);

module.exports = CommentModel;