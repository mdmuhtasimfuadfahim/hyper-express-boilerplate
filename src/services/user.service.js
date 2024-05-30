const { User } = require('../models');

const createUser = async (userData) => {
    try {
        const user = new User(userData);
        await user.save();
        return user;
    } catch (err) {
        if (err.name === 'ValidationError') {
            console.log("Mesasge: ", err.message);
            throw new Error(err.message);
        }
        throw err;
    }
};

module.exports = {
    createUser,
};