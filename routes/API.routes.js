const router = require("express").Router();

const PostModel = require('../models/Post.model');
const UserModel = require('../models/User.model');

// Route to upvote and downvote
router.post("/home/vote", async (req, res, next) => {
  const {userID, postID, upOrDownVote} = req.body

  const updatedPost = await PostModel.findById(postID)

  if(upOrDownVote) {
    updatedPost.upvotes.push(userID)
  }
  else {
    updatedPost.downvotes.push(userID)
  }

  const final = await PostModel.findByIdAndUpdate(postID, updatedPost)
  
  
  res.status(200).send();
});

module.exports = router;