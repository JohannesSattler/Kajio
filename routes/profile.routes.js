const router = require('express').Router();
const UserModel = require('../models/User.model');
const PostModel = require('../models/Post.model');
const Helpers = require('../scripts/helpers')

router.get('/profile', async (req, res, next) => {
    // Get all users and populates all posts & comments
    const user = await UserModel.findById(req.session.user._id)
        .populate('postCreated')
        .populate('postUpvoted')
        .populate('comments')

    // make sure all post have some calculated values
    user.postCreated.forEach(post => {
      Helpers.createAdvancedPostKeys(post, user._id)
    })

    user.postUpvoted.forEach(post => {
        Helpers.createAdvancedPostKeys(post, user._id)
    })

    // can be replaced with userobj in the future
    // just for testing
    const posts = {
        postCreated: user.postCreated,
        postUpvoted: user.postUpvoted,
        comments: user.comments
    }

    res.render('profile/profile.hbs', {posts})
})

router.get('/profile/new-post', async (req, res, next) => {
    res.render('profile/newPost.hbs', {userID: req.session.user._id})
})

router.post('/profile/new-post', async (req, res, next) => {
    const {sentence} = req.body
    console.log(sentence);

    const post = Helpers.createPost(sentence)
    const newPost = await PostModel.create(post)

    const updatedUser = Helpers.updateUserArraysOfObjIDs(req.session.user._id, newPost._id)
    console.log({updatedUser})

    req.session.user = updatedUser

    res.redirect('/home/new')
})

module.exports = router;