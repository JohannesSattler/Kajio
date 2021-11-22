const router = require('express').Router();
const UserModel = require('../models/User.model');
const PostModel = require('../models/Post.model');
const CommentModel = require('../models/Comment.model')
const bcrypt = require('bcryptjs');

router.get('/signup', (req, res, next) => {
    res.render('auth/signup.hbs')
})

router.get('/login', (req, res, next) => {
    res.render('auth/login.hbs')
})

router.get('/comment', (req, res, next) => {
    res.render('auth/comment.hbs')
})

router.post('/comment', (req, res, next) => {
    const{username, sentence} = req.body

    CommentModel.create({username, sentence})
    .then(() => { 
        res.redirect('/profile')
    })
    .catch((err) => {
        next(err)
    })
})

router.get('/homepage', (req, res, next) => {
    res.render('auth/homepage.hbs')
})

router.get('/profile', (req, res, next) => {
    res.render('auth/profile.hbs')
})

router.post('/profile', (req, res, next) => {
    res.render('auth/profile.hbs')
})

router.post('/signup', (req, res, next) => {
    const {username, password} = req.body

   let salt = bcrypt.genSaltSync(10);
   let hash = bcrypt.hashSync(password, salt);

UserModel.create({username, password: hash}) //:hash for regex pw
   .then(() => {
    res.redirect('/')
})
.catch((err) => {
    next(err)
})
});

router.post('/login', (req, res, next) => {
    const{username, password} = req.body

    UserModel.findOne({username})
    .then((usernameResponse) => {
        console.log(usernameResponse)
        if(usernameResponse){
            let userObj = usernameResponse
            console.log(userObj)

            let isMatching = bcrypt.compareSync(password, userObj.password);
            if(isMatching){
                req.session.myProperty = userObj

                res.redirect('/profile')
            }
            else{
                res.render('auth/login.hbs', {error: 'Password not matching'})
                return;
              }
          }
          else {
            res.render('auth/login.hbs', {error: 'check'})
            return;
          }
      })
      .catch((err) => {
        next(err) 
        console.log('hello world')
      })
})








module.exports = router;