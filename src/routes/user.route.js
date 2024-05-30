const { Router } = require('hyper-express');
const { userController } = require('../controllers');
const { createUserSchema } = require('../validations');
const { z } = require('zod');

const router = new Router();

// Middleware for validation
const validateCreateUser = async (req, res, next) => {
    const body = await req.json();
    const validation = createUserSchema.safeParse(body);
    if (!validation.success) {
        return res.status(400).json({ errors: validation.error.errors });
    }
    next();
};

router.post('/users', validateCreateUser, userController.createUser);

module.exports = router;