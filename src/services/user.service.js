const { ObjectId } = require('mongodb');
const { uploadImage } = require('../helpers/image.helper');

const createUser = async ({ userData, image }) => {
    const existingUser = await User.findOne({ email: userData.email });

    if (existingUser) {
        throw new Error('A user with this email already exists');
    }

    if (image) {
        const imageUrl = await uploadImage(image);
        userData.image = imageUrl;
    }

    const newUser = await User.create(userData);
    return { data: newUser, message: 'User created successfully' };
};

const getUser = async (userId) => {
    const user = await User.find({ where: { _id: userId } });
    if (!user) {
        throw new Error('User not found');
    }
    return { data: user, message: 'User fetched successfully' };
};

const updateUser = async (userId, userData) => {
    const user = await User.updateOne({ id: userId }).set(userData);
    if (!user) {
        throw new Error('User not found');
    }
    return { data: user, message: 'User updated successfully' };
};

const deleteUser = async (userId) => {
    var user = await User.destroyOne({
        where: { id: userId },
    });

    if (!user) {
        throw new Error('User not found');
    }
    return { message: 'User deleted successfully' };
};


module.exports = {
    createUser,
    getUser,
    updateUser,
    deleteUser,
};