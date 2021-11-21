const router = require("express").Router();
const PostModel = require('../models/Post.model');

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/home", async (req, res, next) => {
  const posts = await PostModel.find()
  // create min ago field
  posts.forEach(post => {
    post.timeAgo = '2 min ago'
  })

  res.render("pages/main.hbs", {posts});
});


module.exports = router;
