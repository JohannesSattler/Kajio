const router = require("express").Router();
const PostModel = require('../models/Post.model');
const Helpers = require('../helpers')

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/home", async (req, res, next) => {
  const posts = await PostModel.find()
  // create min ago field
  posts.forEach(post => {
    post.votes = post.upvotes.length - post.downvotes.length
    post.timeAgo = Helpers.convertToTimeAgo(post.createdAt)
  })

  res.render("pages/main.hbs", {posts});
});


module.exports = router;
