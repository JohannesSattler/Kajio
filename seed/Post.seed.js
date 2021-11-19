const faker = require('faker');
const PostModel = require('../models/Post.model');

function createFakePost() {
    const sentence = faker.hacker.phrase()
    const upvotes = Math.floor(Math.random() * 10)

    return {sentence, upvotes}
}

async function plotPostInDB(postData) {
    try {
        const post = await PostModel.create(postData)
        return post;
    } catch (error) {
        console.log(error)
    }
}

module.exports = {createFakePost, plotPostInDB}