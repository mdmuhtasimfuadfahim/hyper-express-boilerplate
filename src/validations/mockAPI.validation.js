// src/validations/mockAPI.validation.js
const { z } = require('zod');

const createMockDataSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email format'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
}).strict();

module.exports = {
    createMockDataSchema,
};
