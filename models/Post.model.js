const { Schema, model } = require("mongoose");

const postSchema = new Schema(
  {
    sentence: String,
    upvotes: Number,
    comments: Array,
  },
  {
    timestamps: true,
  }
);

const PostModel = model("Posts", postSchema);

module.exports = PostModel;