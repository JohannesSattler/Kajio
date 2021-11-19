const router = require('express').Router();
const UserModel = require('../models/User.model');
const PostModel = require('../models/Post.model');
const CommentModel = require('../models/Comment.model')
//const bcrypt = require('bcryptjs');

router.get('/signup', (req, res, next) => {
    res.render('auth/signup.hbs')
})

router.get('/login', (req, res, next) => {
    res.render('auth/login.hbs')
})

router.get('/comment', (req, res, next) => {
    res.render('auth/comment.hbs')
})

route.post('/comment', (req, res, next) => {
    const{username} = req
})

router.get('/homepage', (req, res, next) => {
    res.render('auth/homepage.hbs')
})

router.get('/profile', (req, res, next) => {
    res.render('auth/profile.hbs')
})
router.post('/signup', (req, res, next) => {
    const {username, password} = req.body

  //  let salt = bcrypt.genSaltSync(10);
  //  let hash = bcrypt.hashSync(password, salt);

UserModel.create({username, password}) //:hash for regex pw
   .then(() => {
    res.redirect('/')
})
.catch((err) => {
    next(err)
})
});

router.post('/login', (req, res, next) => {
    const{username, password} = req.body

    UserModel.find({username})
    .then((usernameResponse) => {
        if(usernameRespone.length){
            let userObj = usernameResponse[0]

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
            res.render('auth/login.hbs', {error: 'User email does not exist'})
            return;
          }
      })
      .catch((err) => {
        next(err)
      })
})








module.exports = router;