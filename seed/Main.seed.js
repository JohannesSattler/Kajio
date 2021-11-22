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

/**
 * Creates n comments
 * @param {Number} amount the amount of comments
 * @returns all the ids of the comments
 */
async function createComments(amount) {
    const ids = [];

    for (let i = 0; i < amount; i++) {
        const newComment = CommentSeed.createFakeComment()
        const comment = await CommentSeed.plotCommentInDB(newComment)
        ids.push(comment._id)
    }

    return ids;
}

/**
 * Creates n posts with comments
 * @param {Number} amount the amount of posts
 * @returns all the ids of the posts
 */
async function createPosts(amount) {
    const ids = [];

    for (let i = 0; i < amount; i++) {
        const comments = await createComments(Math.floor(Math.random() * 10))
        const newPost = PostSeed.createFakePost(comments)
        const post = await PostSeed.plotPostInDB(newPost)

        const popPost = await PostSeed.populateById(post._id)

        ids.push(popPost._id)
    }

    return ids;
}

/**
 * Creates n users and populates the user with posts & comments
 * @param {Number} amount amount of users that will be created
 */
async function mainPlotting(amount) {
    await deleteAll()

    for (let i = 0; i < amount; i++) {
        const postCreated = await createPosts(Math.floor(Math.random() * 5))
        const postUpvoted = await createPosts(Math.floor(Math.random() * 10))
        const comments = await createComments(Math.floor(Math.random() * 30))

        const newUser = UserSeed.createFakeUser(postCreated, postUpvoted, comments)
        const user = await UserSeed.plotUserInDB(newUser)

        // populate the user
        const popUser = await UserSeed.populateById(user._id)
        
        console.log(popUser);
    }
}

mainPlotting(10)