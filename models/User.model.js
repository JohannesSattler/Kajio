const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
    },
    // // email: {
    // //   type: String,
    // //   unique: false,
    // },
    password: String,
    postCreated: Array,
    postUpvoted: Array,
    comments: Array,
  },
  {
    timestamps: true,
  }
);

const UserModel = model("Users", userSchema);

module.exports = UserModel;
