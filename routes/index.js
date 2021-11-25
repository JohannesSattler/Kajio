const router = require("express").Router();
const CommentModel = require("../models/Comment.model");
const PostModel = require('../models/Post.model');
const UserModel = require('../models/User.model');

const Helpers = require('../scripts/helpers')

/* GET home page */
router.get("/", (req, res, next) => {
  res.redirect("/landingpage");
});

// HOME PAGES
router.get("/home", Helpers.userLoginProtected, async (req, res, next) => {
  res.redirect('/home/hot')
});

async function homeSubRoutes(req, res, route) {
  const sort = Helpers.getPostSortFromURL(route)

  const posts = await PostModel.find()
    .sort(sort)
    .limit(10)
  
  posts.forEach(async post => {
    await Helpers.createAdvancedPostKeys(post, req.session.user._id)
  })

  res.render("pages/main.hbs", {posts});
}

router.get("/home/hot", Helpers.userLoginProtected, async (req, res, next) => {
  homeSubRoutes(req, res, "/home/hot")
});

router.get("/home/trendy", Helpers.userLoginProtected, async (req, res, next) => {
  homeSubRoutes(req, res, "/home/trendy")
});

router.get("/home/new", Helpers.userLoginProtected, async (req, res, next) => {
  homeSubRoutes(req, res, "/home/new")
});

module.exports = router;
