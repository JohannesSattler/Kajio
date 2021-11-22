const router = require("express").Router();
const CommentModel = require("../models/Comment.model");
const PostModel = require('../models/Post.model');
const UserModel = require('../models/User.model');

const Helpers = require('../scripts/helpers')

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/home", async (req, res, next) => {
  const posts = await PostModel.find().limit(10)
  const currentUser = await UserModel.find()

  // create min ago field
  posts.forEach(post => {
    Helpers.createAdvancedPostKeys(post, currentUser[0]._id)
  })

  res.render("pages/main.hbs", {posts});
});

router.get("/comment/:postId", async (req, res, next) => {
  const {postId} = req.params
  const post = await PostModel.findById(postId).populate('comments')
  
  const currentUser = await UserModel.find()
  Helpers.createAdvancedPostKeys(post, currentUser[0]._id)

  res.render("auth/comment.hbs", {post: [post], comments: post.comments});
});

module.exports = router;
