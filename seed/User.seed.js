const faker = require('faker');
const UserModel = require('../models/User.model');

function createFakeUser(postCreated = [], postUpvoted = [], comments = []) {
    const username = faker.internet.userName()
    const email = faker.internet.email()
    const password = faker.internet.password()

    return {
        username,
        email,
        password,
        postCreated,
        postUpvoted,
        comments
    }
}

async function plotUserInDB(userData) {
    try {
        const user = await UserModel.create(userData)
        return user;
    } catch (error) {
        console.log(error)
    }
}

async function populateById(id) {
    try {
        const user = await UserModel.findById(id)
            .populate('postCreated')
            .populate('postUpvoted')
            .populate('comments')
        
        user.postCreated.forEach(async post => {
            await post.populate('comments')
        });

        user.postUpvoted.forEach(async post => {
            await post.populate('comments')
        });
        
        return user;
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    createFakeUser,
    plotUserInDB,
    populateById
}