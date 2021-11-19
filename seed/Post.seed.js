const faker = require('faker');
const PostModel = require('../models/Post.model');

function createFakePost(comments = []) {
    const sentence = faker.hacker.phrase()
    const upvotes = Math.floor(Math.random() * 10)

    return {sentence, upvotes, comments}
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