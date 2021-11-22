const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: String,
   // email: String,
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
