const express = require('express');
const router = express.Router();
const { userValidationRules, validate } = require('../middleware/validators');
const auth = require('../middleware/auth');
const UserController = require('../controllers/user.controller');

router.post('/signup', userValidationRules(), validate, UserController.signup);
router.post('/login', UserController.login); // Changed from signin to login
router.get('/profile', auth, UserController.getProfile);
router.put('/profile', auth, userValidationRules(), validate, UserController.updateProfile);

module.exports = router;
