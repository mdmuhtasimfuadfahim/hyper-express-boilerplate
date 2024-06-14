const { userService } = require('../services');

const createUser = async (req, res) => {
    try {
        const body = req.body;
        const image = req.file;
        const newUser = await userService.createUser({ userData: body, image: image });
        res.status(200).json({ message: newUser.message, data: newUser.data });
    } catch (error) {
        res.status(400).json({ message: error.message, data: null });
    }
};
const getUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await userService.getUser(userId);
        res.status(200).json({ message: user.message, data: user.data });
    } catch (error) {
        res.status(400).json({ message: error.message, data: null });
    }
};

const updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const body = await req.json();
        const user = await userService.updateUser(userId, body);
        res.status(200).json({ message: user.message, data: user.data });
    } catch (error) {
        res.status(400).json({ message: error.message, data: null });
    }
};

const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await userService.deleteUser(userId);
        res.status(200).json({ message: user.message });
    } catch (error) {
        res.status(400).json({ message: error.message, data: null });
    }
};


module.exports = {
    createUser,
    getUser,
    updateUser,
    deleteUser,
};