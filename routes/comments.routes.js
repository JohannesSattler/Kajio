const router = require('express').Router();

const UserModel = require('../models/User.model');
const PostModel = require('../models/Post.model');
const CommentModel = require('../models/Comment.model')

const Helpers = require('../scripts/helpers')

router.get('/comment', Helpers.userLoginProtected, async (req, res, next) => {
    res.render('pages/comment.hbs', {comments})
})

router.post('/comment/:postId/create', Helpers.userLoginProtected, async (req, res, next) => {
    const{sentence} = req.body
    const {postId} = req.params;
    console.log(postId, sentence);

    // find the current user
    const username = req.session.user.username
    
    // create comment
    const comment = await CommentModel.create({username, sentence})
    console.log('THis is my comment ID: ', comment._id);

    // add to post model
    await PostModel.findByIdAndUpdate(postId, {"$push": {comments: comment._id}})

    // update user data
    Helpers.updateUserArraysOfObjIDs(req.session.user._id, null, null, comment._id)

    res.redirect('/comment/' + postId)
})

router.get("/comment/:postId", Helpers.userLoginProtected, async (req, res, next) => {
    const {postId} = req.params
    const post = await PostModel.findById(postId).populate('comments')

    Helpers.createAdvancedPostKeys(post, req.session.user._id)
  
    res.render("pages/comment.hbs", {post, comments: post.comments});
});

router.get("/post/random", Helpers.userLoginProtected, async (req, res, next) => {
    const post = await PostModel.find()
    const randomPost = post[Math.floor(Math.random() * post.length)];
    res.redirect('/comment/' + randomPost._id)
});

module.exports = router;