const router = require("express").Router();
const PostModel = require('../models/Post.model');
const UserModel = require('../models/User.model');
const Helpers = require('../scripts/helpers')

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/home", async (req, res, next) => {
  const posts = await PostModel.find()
  const currentUser = await UserModel.find()

  // create min ago field
  posts.forEach(post => {
    if(post.upvotes.includes(currentUser[0]._id)) {
      post.upvote = "some"
    }
    if(post.downvotes.includes(currentUser[0]._id)) {
      post.downvote = "some"
    }

    post.votes = post.upvotes.length - post.downvotes.length
    post.timeAgo = Helpers.convertToTimeAgo(post.createdAt)
    post.userid = currentUser[0]._id
  })

  res.render("pages/main.hbs", {posts});
});


module.exports = router;
