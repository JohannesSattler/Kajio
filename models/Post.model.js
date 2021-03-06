const { Schema, model } = require("mongoose");

const postSchema = new Schema(
  {
    username: String,
    sentence: String,
    upvotes: [{
      type: Schema.Types.ObjectId,
      ref: 'Users',
    }],
    downvotes: [{
      type: Schema.Types.ObjectId,
      ref: 'Users',
    }],
    comments: [{
      type: Schema.Types.ObjectId,
      ref: 'Comments',
    }],
    totalVotes: Number,
    commentsCount: Number,
  },
  {
    timestamps: true,
  }
);

const PostModel = model("Posts", postSchema);

module.exports = PostModel;