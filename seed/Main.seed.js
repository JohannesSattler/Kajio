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
        const newPost = PostSeed.createFakePost()
        const post = await PostSeed.plotPostInDB(newPost)

        const newComment = CommentSeed.createFakeComment()
        const comment = await CommentSeed.plotCommentInDB(newComment)
        
        const newUser = UserSeed.createFakeUser([post._id], [post._id], [comment._id])
        const user = await UserSeed.plotUserInDB(newUser)

        console.log({user, post, comment})

        await UserSeed.populateById(user._id)
    }
}

mainPlotting(1)