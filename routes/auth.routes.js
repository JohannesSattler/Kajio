const router = require('express').Router();
const UserModel = require('../models/User.model');
const PostModel = require('../models/Post.model');
const CommentModel = require('../models/Comment.model')
const bcrypt = require('bcryptjs');

router.get('/landingpage', (req, res, next) => {
    res.render('auth/landingpage.hbs')
})

router.post('/landingpage', (req, res, next) => {
    res.redirect('auth/homepage.hbs')
})

router.get('/signup', (req, res, next) => {
    res.render('auth/signup.hbs')
})

router.get('/login', (req, res, next) => {
    res.render('auth/login.hbs')
})

router.get('/homepage', (req, res, next) => {
    res.render('auth/homepage.hbs')
})

router.post('/signup', (req, res, next) => {
    const {username, email, password} = req.body

   let salt = bcrypt.genSaltSync(10);
   let hash = bcrypt.hashSync(password, salt);

UserModel.create({username, email, password: hash}) //:hash for regex pw
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