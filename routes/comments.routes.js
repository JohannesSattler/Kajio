const router = require('express').Router();

const UserModel = require('../models/User.model');
const PostModel = require('../models/Post.model');
const CommentModel = require('../models/Comment.model')

const Helpers = require('../scripts/helpers')

router.get('/comment', async (req, res, next) => {
    res.render('pages/comment.hbs', {comments})
})

router.post('/comment/create', (req, res, next) => {
    const{username, sentence} = req.body

    CommentModel.create({username, sentence})
    .then(() => { 
        res.redirect('/profile')
    })
    .catch((err) => {
        next(err)
    })
})

router.get("/comment/:postId", async (req, res, next) => {
    const {postId} = req.params
    const post = await PostModel.findById(postId).populate('comments')
    
    const currentUser = await UserModel.find()
    Helpers.createAdvancedPostKeys(post, currentUser[0]._id)
  
    res.render("pages/comment.hbs", {post: [post], comments: post.comments});
  });

module.exports = router;