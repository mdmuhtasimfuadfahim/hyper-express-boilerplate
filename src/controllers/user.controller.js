const { userService } = require('../services');

const createUser = async (req, res) => {
    const body = await req.json();
    const newUser = await userService.createUser(body);
    res.status(200).json({ message: 'User created successfully', data: newUser });
};

module.exports = {
    createUser,
};