const router = require('express').Router();
const UserModel = require('../models/User.model');
const PostModel = require('../models/Post.model');
const CommentModel = require('../models/Comment.model');
const Helpers = require('../scripts/helpers');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

router.get('/profile', Helpers.userLoginProtected, async (req, res, next) => {
    // Get all users and populates all posts & comments
    const user = await UserModel.findById(req.session.user._id)
        .populate('postCreated')
        .populate('postUpvoted')
        .populate('comments')

    //console.log(user, req.session.user)
    // make sure all post have some calculated values
    user.postCreated.forEach(post => {
        Helpers.createAdvancedPostKeys(post, user._id)
        post.isUserOwner = true
    })

    user.postUpvoted.forEach(post => {
        Helpers.createAdvancedPostKeys(post, user._id)
    })

    user.comments.forEach(comment => comment.isUserOwner = true)
    // can be replaced with userobj in the future
    // just for testing
    const posts = {
        postCreated: user.postCreated,
        postUpvoted: user.postUpvoted,
        comments: user.comments
    }

    res.render('profile/profile.hbs', {posts})
})

router.get('/profile/new-post', Helpers.userLoginProtected, async (req, res, next) => {
    res.render('profile/newPost.hbs', {userID: req.session.user._id})
})

router.post('/profile/new-post', Helpers.userLoginProtected, async (req, res, next) => {
    const {sentence} = req.body
    console.log(sentence);
    
    const user = await UserModel.findById(req.session.user._id)
    const post = Helpers.createPost(user.username, sentence)
    const newPost = await PostModel.create(post)
    
    await Helpers.updateUserArraysOfObjIDs(req.session.user._id, newPost._id)
    res.redirect('/home/new')
})

router.post('/profile/comment/:commentID/delete', Helpers.userLoginProtected, async (req, res, next) => {
    const {commentID} = req.params
    await CommentModel.findByIdAndDelete(commentID)
    // delete comments from Post & User model
    await PostModel.updateMany({ $pull: {"comments": mongoose.Types.ObjectId(commentID)}} )
    await UserModel.findByIdAndUpdate(req.session.user._id, {$pull: {"comments": mongoose.Types.ObjectId(commentID)}})

    res.redirect('/profile')
})

router.post('/profile/post/:postID/delete', Helpers.userLoginProtected, async (req, res, next) => {
    const {postID} = req.params
    await PostModel.findByIdAndDelete(postID)

    // delete post from User model
    await UserModel.findByIdAndUpdate(req.session.user._id, {$pull: {"postCreated": mongoose.Types.ObjectId(postID)}})

    res.redirect('/profile')
})

router.get('/profile/update-user', Helpers.userLoginProtected, async (req, res, next) => {
    res.render('profile/updateUser.hbs')
})

router.post('/profile/update-user', Helpers.userLoginProtected, async (req, res, next) => {
    const {username, password} = req.body

    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(password, salt);

    const newUser = await UserModel.findByIdAndUpdate(req.session.user._id, {username, password: hash})
    req.session.user = newUser
    res.redirect('/profile')
})

router.get('/profile/delete-user', Helpers.userLoginProtected, async (req, res, next) => {
    await UserModel.findByIdAndDelete(req.session.user._id);
    req.session.destroy()
    res.redirect('/profile')
})


module.exports = router;