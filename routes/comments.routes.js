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

    // find a random user
    const currentUser = await UserModel.find()
    const username = currentUser[0].username
    
    // create comment
    const comment = await CommentModel.create({username, sentence})

    // add to post model
    const post = await PostModel.findById(postId)
    post.comments.push(comment._id)
    await PostModel.findByIdAndUpdate(postId, {comments: post.comments})

    console.log(post.comments)
    res.redirect('/comment/' + postId)
})

router.get("/comment/:postId", async (req, res, next) => {
    const {postId} = req.params
    const post = await PostModel.findById(postId).populate('comments')
    
    const currentUser = await UserModel.find()
    Helpers.createAdvancedPostKeys(post, currentUser[0]._id)
  
    res.render("pages/comment.hbs", {post, comments: post.comments});
  });

module.exports = router;