const router = require("express").Router();
const CommentModel = require("../models/Comment.model");
const PostModel = require('../models/Post.model');
const UserModel = require('../models/User.model');

const Helpers = require('../scripts/helpers')

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

// HOME PAGES
router.get("/home", async (req, res, next) => {
  res.redirect('/home/hot')
});

router.get("/home/hot", async (req, res, next) => {
  const posts = await PostModel.find()
    .sort([["totalVotes", "desc"], ["commentsCount","desc"]])
    .limit(10)

  const currentUser = await UserModel.find()

  // create min ago field
  posts.forEach(post => {
    Helpers.createAdvancedPostKeys(post, currentUser[0]._id)
  })

  res.render("pages/main.hbs", {posts});
});

router.get("/home/trendy", async (req, res, next) => {
  const posts = await PostModel.find()
  .sort([
    ["totalVotes","desc"],
    ["createdAt","desc"],
  ]).limit(10)
  
  const currentUser = await UserModel.find()

  // create min ago field
  posts.forEach(post => {
    Helpers.createAdvancedPostKeys(post, currentUser[0]._id)
  })

  res.render("pages/main.hbs", {posts});
});

router.get("/home/new", async (req, res, next) => {
  const posts = await PostModel.find()
    .sort([["createdAt","desc"]])
    .limit(10)
  
  const currentUser = await UserModel.find()

  // create min ago field
  posts.forEach(post => {
    Helpers.createAdvancedPostKeys(post, currentUser[0]._id)
  })

  res.render("pages/main.hbs", {posts});
});

module.exports = router;
