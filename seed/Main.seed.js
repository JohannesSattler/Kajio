require('../db');

// Models
const UserModel = require('../models/User.model');
const PostModel = require('../models/Post.model');
const CommentModel = require('../models/Comment.model');

// Seeds
const UserSeed = require('./User.seed');
const PostSeed = require('./Post.seed');
const CommentSeed = require('./Comment.seed');

// Delete all data
async function deleteAll() {
    await UserModel.deleteMany()
    await PostModel.deleteMany()
    await CommentModel.deleteMany()
}

async function mainPlotting(amount) {
    await deleteAll()

    for(let i = 0; i < amount; i++) {
        const newUser = UserSeed.createFakeUser()
        UserSeed.plotUserInDB(newUser)
        
        const newPost = PostSeed.createFakePost()
        PostSeed.plotPostInDB(newPost)

        const newComment = CommentSeed.createFakeComment()
        CommentSeed.plotCommentInDB(newComment)
    }
}

mainPlotting(10)