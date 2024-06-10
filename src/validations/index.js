const { createMockDataSchema } = require('./mockAPI.validation');
const {
    createUserSchema,
    getUserSchema,
    updateUserSchema,
    deleteUserSchema
} = require('./user.validation');

module.exports = {
    createMockDataSchema,
    createUserSchema,
    getUserSchema,
    updateUserSchema,
    deleteUserSchema
};
