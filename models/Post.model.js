const { Schema, model } = require("mongoose");

const postSchema = new Schema(
  {
    username: {
      type: String,
      require: true,
    },
    sentence: String,
    upvotes: Number,
    timeCreated: Date,
    comments: Array,
  },
  {
    timestamps: true,
  }
);

const PostModel = model("Posts", postSchema);

module.exports = PostModel;