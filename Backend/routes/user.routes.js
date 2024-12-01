const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');

////for user registration
router.post('/register' , [
    // Validate email
    body('email').isEmail().withMessage('Invalid email format'),

    // Validate firstname (required and at least 3 characters long)
    body('fullname.firstname').isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),

    // Validate lastname (optional, but if provided, must be at least 3 characters)
    body('fullname.lastname').optional().isLength({ min: 3 }).withMessage('Last name must be at least 3 characters long'),

    // Validate password (at least 6 characters long)
    body('password').isLength({ min: 6 }).withMessage('Password should be at least 6 characters long'),
    
],userController.registerUser)


////for userlogin
router.post('/login',[
    // Validate email
    body('email').isEmail().withMessage('Invalid email format'),
    // Validate password (at least 6 characters long)
    body('password').isLength({ min: 6 }).withMessage('Password should be at least 6 characters long'),
    
],userController.loginUser)


//for fetching userprofile
router.post('/profile',authMiddleware.authUser , userController.getUserProfile)



module.exports  = router