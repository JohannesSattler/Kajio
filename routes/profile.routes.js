const router = require('express').Router();
const UserModel = require('../models/User.model');

router.get('/profile', async (req, res, next) => {
    // find first user for example
    const users = await UserModel.find()
        .populate('postCreated')
        .populate('postUpvoted')
        .populate('comments')

    const randomIndex = Math.floor(Math.random() * users.length)
    const currentUser = users[randomIndex]
    
    const data = {
        postCreated: currentUser.postCreated,
        postUpvoted: currentUser.postUpvoted,
        comments: currentUser.comments
    }

    console.log(data)
    res.render('profile/profile.hbs', {data})
})

router.get('/profile/new-post', (req, res, next) => {
    res.render('profile/newPost.hbs')
})

module.exports = router;