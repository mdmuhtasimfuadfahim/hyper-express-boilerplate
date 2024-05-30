const { Router } = require('hyper-express');
const { mockAPIController } = require('../controllers');
const { createMockDataSchema } = require('../validations');

const router = new Router();

// Middleware for validation
const validateCreateMockData = async (req, res, next) => {
    const body = await req.json();
    console.log('b', body);
    const validation = createMockDataSchema.safeParse(body);
    if (!validation.success) {
        return res.status(400).json({ errors: validation.error.errors });
    }
    next();
};

router.get('/mock-data', mockAPIController.getMockData);
router.post('/mock-data', validateCreateMockData, mockAPIController.createMockData);

module.exports = router;
