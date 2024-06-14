const multer = require('multer');
const { Router } = require('hyper-express');
const { userController } = require('../controllers');
const {
    createUserSchema,
    getUserSchema,
    updateUserSchema,
    deleteUserSchema
} = require('../validations');

const router = new Router();
const upload = multer();

// Middleware for validation
const validateCreateUser = async (req, res, next) => {
    const body = req.body;
    const file = req.file;
    const validation = createUserSchema.safeParse(body);

    if (!validation.success) {
        return res.status(400).json({ errors: validation.error.errors });
    }

    // Add the image file to the validated data
    validation.data.image = file;

    next();
};
const validateGetUser = async (req, res, next) => {
    const validation = getUserSchema.safeParse(req.params);
    if (!validation.success) {
        return res.status(400).json({ errors: validation.error.errors });
    }
    next();
};

const validateUpdateUser = async (req, res, next) => {
    const validation = updateUserSchema.safeParse({ ...req.params, ...await req.json() });
    if (!validation.success) {
        return res.status(400).json({ errors: validation.error.errors });
    }
    next();
};

const validateDeleteUser = async (req, res, next) => {
    const validation = deleteUserSchema.safeParse(req.params);
    if (!validation.success) {
        return res.status(400).json({ errors: validation.error.errors });
    }
    next();
};

router.post('/create-user', upload.single('image'), validateCreateUser, userController.createUser);
router.get('/get-user/:id', validateGetUser, userController.getUser);
router.post('/update-user/:id', validateUpdateUser, userController.updateUser);
router.post('/delete-user/:id', validateDeleteUser, userController.deleteUser);

module.exports = router;