const router = require('express').Router();
const UserModel = require('../models/User.model');
const PostModel = require('../models/Post.model');
const CommentModel = require('../models/Comment.model')

router.get('/signup', (req, res, next) => {
    res.render('auth/signup.hbs')
})

router.get('/login', (req, res, next) => {
    res.render('auth/login.hbs')
})





module.exports = router;