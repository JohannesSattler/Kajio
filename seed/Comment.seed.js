const faker = require('faker');
const CommentModel = require('../models/Comment.model');

function createFakeComment() {
    const username = faker.internet.userName()
    const sentence = faker.hacker.phrase()

    return {username, sentence}
}

async function plotCommentInDB(postData) {
    try {
        const comment = await CommentModel.create(postData)
        return comment;
    } catch (error) {
        console.log(error)
    }
}

module.exports = {createFakeComment, plotCommentInDB}