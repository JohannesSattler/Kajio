const router = require("express").Router();
const hbs = require("handlebars");

const fs = require("fs");
const path = require('path');

const PostModel = require('../models/Post.model');
const UserModel = require('../models/User.model');

const Helpers = require('../scripts/helpers')

// Route to upvote and downvote
router.post("/home/vote", async (req, res, next) => {
  const {
    userID,
    postID,
    upOrDownVote
  } = req.body

  const updatedPost = await PostModel.findById(postID)

  // check for up or downvote and check if its includes in upvote or downvote
  if (upOrDownVote && !updatedPost.upvotes.includes(userID)) {
    updatedPost.upvotes.push(userID)

    // check if its inside downvote
    if (updatedPost.downvotes.includes(userID)) {
      const index = updatedPost.downvotes.indexOf(userID)
      updatedPost.downvotes.splice(index, 1)
    }
  } else if (!upOrDownVote && !updatedPost.downvotes.includes(userID)) {
    updatedPost.downvotes.push(userID)

    // check if its inside upvote
    if (updatedPost.upvotes.includes(userID)) {
      const index = updatedPost.upvotes.indexOf(userID)
      updatedPost.upvotes.splice(index, 1)
    }
  }

  Helpers.updatePostWithCounter(updatedPost, updatedPost._id)
  // send back the votes data
  const votes = updatedPost.upvotes.length - updatedPost.downvotes.length
  res.status(200).json(JSON.stringify({
    votes
  }))
});

// infinite scroll get next post after point x
router.post("/home/next-posts", async (req, res, next) => {
  const {startIndex, increment, url} = req.body

  // get the sort function
  const sort = Helpers.getPostSortFromURL(url)
  //get next values for infinite scroll
  const posts = await PostModel.find().sort(sort).skip(startIndex).limit(increment)

  // send back no content to client
  if(!posts.length) {
    res.status(200).json(JSON.stringify({warning: 'No content found for more posts'}))
    return;
  }
  // reads partial file as string and compiles it
  const templateStr = fs.readFileSync(path.resolve(__dirname, '../views/partials/post.hbs')).toString('utf8')
  const template = hbs.compile(templateStr)

  // oh boi: creates an html array out of post.hbs partials with next post values
  const htmlArray = []
  posts.forEach(post => {
  Helpers.createAdvancedPostKeys(post, req.session.user._id)

    const html = template({
      data: post
    }, {
      allowedProtoProperties: true,
      allowProtoMethodsByDefault: true,
      allowProtoPropertiesByDefault: true,
    });

    htmlArray.push(html)
  })

  // send back data to client
  res.status(200).json(JSON.stringify({htmlArray}))
});

module.exports = router;