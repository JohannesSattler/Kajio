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
//regex info
function CheckPassword(inputtxt) 
{ 
var regex=  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
if(inputtxt.match(regex)) 
{ 
return true;
}
else
{ 
('Create a password 8-15 characters long, one uppercase letter, 1 number, and #1 special character')
return false;
}
} 



router.post('/signup', (req, res, next) => {
    const {username, email, password} = req.body

    
      if(!CheckPassword(password)){
       res.render('auth/signup.hbs', {error: 'Password needs to be 8-15 characters long, one uppercase letter, 1 number, and #1 special character'})
       return;
      };
   let salt = bcrypt.genSaltSync(10);
   let hash = bcrypt.hashSync(password, salt);

UserModel.create({username, email, password: hash}) //:hash for regex pw
   .then((userObj) => {
        console.log(userObj)
        req.session.user = userObj
        req.session.save()

        res.redirect('/home/hot')
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
                req.session.user = userObj
                req.session.save()

                console.log('My User: ', req.session.user)
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