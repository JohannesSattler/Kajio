const router = require('express').Router();

const UserModel = require('../models/User.model');
const PostModel = require('../models/Post.model');
const CommentModel = require('../models/Comment.model')

const Helpers = require('../scripts/helpers')

router.get('/comment', async (req, res, next) => {
    res.render('pages/comment.hbs', {comments})
})

router.post('/comment/:postId/create', async (req, res, next) => {
    const{sentence} = req.body
    const {postId} = req.params;
    console.log(postId, sentence);

    // find the current user
    const username = req.session.user.username
    
    // create comment
    const comment = await CommentModel.create({username, sentence})

    // add to post model
    await PostModel.findByIdAndUpdate(postId, {"$push": {comments: comment._id} })

    // update user data
    Helpers.updateUserArraysOfObjIDs(req.session.user._id, {commentsItem: comment._id })

    res.redirect('/comment/' + postId)
})

router.get("/comment/:postId", async (req, res, next) => {
    const {postId} = req.params
    const post = await PostModel.findById(postId).populate('comments')
    
    Helpers.createAdvancedPostKeys(post, req.session.user._id)
  
    res.render("pages/comment.hbs", {post, comments: post.comments});
  });

module.exports = router;