const faker = require('faker');
require('../db');
const UserModel = require('../models/User.model');


function createFakeUser() {
    const username = faker.internet.userName()
    const email = faker.internet.email()
    const password = faker.internet.password()

    return {username, email, password}
}

async function plotUserInDB() {
    try {
        const user = await UserModel.create(createFakeUser())
        console.log(user)
    } catch (error) {
        console.log(error)
    }
}

plotUserInDB()