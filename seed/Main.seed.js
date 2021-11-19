const UserSeed = require('./User.seed');

const newUser = UserSeed.createFakeUser()
UserSeed.plotUserInDB(newUser)