const router = require('express').Router();

router.get('/profile', (req, res, next) => {
    // find user and populate data
    
    res.render('profile/profile.hbs')
})

router.get('/profile/new-post', (req, res, next) => {
    res.render('profile/newPost.hbs')
})

module.exports = router;