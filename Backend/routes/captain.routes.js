const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const authMiddleware = require('../middlewares/auth.middleware');
const captainController = require('../controllers/captain.controller');

router.post('/register', [
    // Validate email (must be a valid email format)
    body('email')
        .isEmail()
        .withMessage('Invalid email format'),

    // Validate firstname (required and at least 3 characters long)
    body('fullname.firstname')
        .isLength({ min: 3 })
        .withMessage('First name must be at least 3 characters long'),

    // Validate lastname (optional, but if provided, must be at least 3 characters)
    body('fullname.lastname')
        .optional()
        .isLength({ min: 3 })
        .withMessage('Last name must be at least 3 characters long'),

    // Validate password (required and at least 6 characters long)
    body('password')
        .isLength({ min: 6 })
        .withMessage('Password should be at least 6 characters long'),

    // Validate vehicle color (required and at least 3 characters)
    body('vehicle.color')
        .isLength({ min: 3 })
        .withMessage('Color must be at least 3 characters long'),

    // Validate vehicle plate (required and at least 3 characters)
    body('vehicle.plate')
        .isLength({ min: 3 })
        .withMessage('Plate must be at least 3 characters long'),

    // Validate vehicle capacity (required and must be a number, at least 1)
    body('vehicle.capacity')
        .isNumeric()
        .withMessage('Capacity must be a number')
        .isInt({ min: 1 })
        .withMessage('Capacity must be at least 1'),

    // Validate vehicle type (required, should be one of the allowed types: 'car', 'motorcycle', 'auto')
    body('vehicle.vehicleType')
        .isIn(['car', 'motorcycle', 'auto'])
        .withMessage('Vehicle type must be one of: car, motorcycle, auto'),

    // Optional: Validate location (lat and long are optional, but if provided, they must be numbers)
    body('location.lat')
        .optional()
        .isNumeric()
        .withMessage('Latitude must be a number'),
    body('location.long')
        .optional()
        .isNumeric()
        .withMessage('Longitude must be a number')
], captainController.registerCaptain);

////for userlogin
router.post('/login',[
    // Validate email
    body('email').isEmail().withMessage('Invalid email format'),
    // Validate password (at least 6 characters long)
    body('password').isLength({ min: 6 }).withMessage('Password should be at least 6 characters long'),
    
],captainController.loginCaptain)


////for fetching userprofile
router.post('/profile',authMiddleware.authCaptain , captainController.getCaptainProfile)

////for logout
router.get('/logout',authMiddleware.authCaptain , captainController.logoutCaptain)


module.exports = router;
