const router = require("express").Router();

const PostModel = require('../models/Post.model');
const UserModel = require('../models/User.model');

// Route to upvote and downvote
router.post("/home/vote", async (req, res, next) => {
  const {userID, postID, upOrDownVote} = req.body
  const updatedPost = await PostModel.findById(postID)

  // check for up or downvote and check if its includes in upvote or downvote
  if(upOrDownVote && !updatedPost.upvotes.includes(userID)) {
    updatedPost.upvotes.push(userID)

    // check if its inside downvote
    if(updatedPost.downvotes.includes(userID)) {
      const index = updatedPost.downvotes.indexOf(userID)
      updatedPost.downvotes.splice(index, 1)
    }
  }
  else if(!upOrDownVote && !updatedPost.downvotes.includes(userID)) {
    updatedPost.downvotes.push(userID)

    // check if its inside upvote
    if(updatedPost.upvotes.includes(userID)) {
      const index = updatedPost.upvotes.indexOf(userID)
      updatedPost.upvotes.splice(index, 1)
    }
  }

  await PostModel.findByIdAndUpdate(postID, updatedPost)

  // send back the votes data
  const votes = updatedPost.upvotes.length - updatedPost.downvotes.length
  res.status(200).json(JSON.stringify({votes}))
});

// infinite scroll get next post after point x
router.post("/home/next-posts", async (req, res, next) => {
    
});

module.exports = router;