const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
    },
    password: String,
    postCreated: [{
      type: Schema.Types.ObjectId,
      ref: 'Posts',
    }],
    postUpvoted: [{
      type: Schema.Types.ObjectId,
      ref: 'Posts',
    }],
    comments: [{
      type: Schema.Types.ObjectId,
      ref: 'Comments',
    }],
  },
  {
    timestamps: true,
  }
);

const UserModel = model("Users", userSchema);

module.exports = UserModel;
