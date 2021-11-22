const faker = require('faker');
const PostModel = require('../models/Post.model');

function createFakePost(comments = []) {
    const sentence = faker.hacker.phrase()
    const upvotes = []
    const downvotes = []
    const totalVotes = upvotes.length - downvotes.length;
    const commentsCount = comments.length;
    return {sentence, upvotes, downvotes, comments, totalVotes, commentsCount}
}

async function plotPostInDB(postData) {
    try {
        const post = await PostModel.create(postData)
        return post;
    } catch (error) {
        console.log(error)
    }
}

async function populateById(id) {
    try {
        const post = await PostModel.findById(id)
            .populate('comments')
    
        return post;
    } catch (error) {
        console.log(error)
    }
}

module.exports = {createFakePost, plotPostInDB, populateById}