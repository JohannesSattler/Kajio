const router = require('express').Router();
const UserModel = require('../models/User.model');
const PostModel = require('../models/Post.model');
const Helpers = require('../scripts/helpers')

router.get('/profile', async (req, res, next) => {
    // Get all users and populates all posts & comments
    const users = await UserModel.find()
        .populate('postCreated')
        .populate('postUpvoted')
        .populate('comments')

    // gets a user at random index just for testing
    const randomIndex = Math.floor(Math.random() * users.length)
    const currentUser = users[randomIndex]
    
    // make sure all post have some calculated values
    currentUser.postCreated.forEach(post => {
      Helpers.createAdvancedPostKeys(post, currentUser._id)
    })

    currentUser.postUpvoted.forEach(post => {
        Helpers.createAdvancedPostKeys(post, currentUser._id)
    })

    // can be replaced with userobj in the future
    // just for testing
    const posts = {
        postCreated: currentUser.postCreated,
        postUpvoted: currentUser.postUpvoted,
        comments: currentUser.comments
    }

    res.render('profile/profile.hbs', {posts})
})

router.get('/profile/new-post', async (req, res, next) => {

    //get a random user 
    const users = await UserModel.find()
    const userID = users[0]._id;

    res.render('profile/newPost.hbs', {userID})
})

router.post('/profile/new-post', async (req, res, next) => {
    const {sentence} = req.body
    console.log(sentence);

    //get a random user 
    const users = await UserModel.find()
    const userID = users[0]._id;

    const post = Helpers.createPost(sentence)
    await PostModel.create(post)

    res.redirect('/home/new')
})

module.exports = router;