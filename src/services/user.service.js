const User = require('../models');

const createUser = async (userData) => {
    const user = new User(userData);
    await user.save();
    return user;
};

module.exports = {
    createUser,
};