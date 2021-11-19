const faker = require('faker');
require('../db');
const UserModel = require('../models/User.model');


function createFakeUser() {
    const username = faker.internet.userName()
    const email = faker.internet.email()
    const password = faker.internet.password()

    return {username, email, password}
}

async function plotUserInDB(userData) {
    try {
        const user = await UserModel.create(userData)
        console.log(user)
    } catch (error) {
        console.log(error)
    }
}

module.exports = {createFakeUser, plotUserInDB}