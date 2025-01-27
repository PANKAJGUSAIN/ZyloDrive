const express = require('express');
const router = express.Router();
const {body , query} = require('express-validator');
const rideController = require('../controllers/ride.controller');
const authMiddleware = require('../middlewares/auth.middleware');


// who is the user ,pickup location ,drop location,type of ride
router.post('/create',  authMiddleware.authUser ,
    body('pickup').isString().isLength({min: 3}).withMessage('Invalid Pickup Location'),
    body('destination').isString().isLength({min: 1}).withMessage('Invalid destination Location'),
    body('vehicleType').isString().isIn(['auto', 'car', 'motorcycle']).withMessage('Invalid Vehicle Type'),
    rideController.createRide);

// fares for ride based on pickup location and drop location
router.get('/fare', 
    query('pickup').isString().isLength({min: 3}).withMessage('Invalid Pickup Location'),
    query('destination').isString().isLength({min: 1}).withMessage('Invalid destination Location'),
    rideController.getFare);

router.post('/confirm',authMiddleware.authCaptain ,
    body('rideId').isMongoId().withMessage('Invalid ride ID'),
    rideController.confirmRide
)   

router.get('/start-ride',authMiddleware.authCaptain, 
    query('rideId').isMongoId().withMessage('Invalid ride ID'),
    query('otp').isString().isLength({min:6 , max:6}).withMessage('Invalid OTP'),
    rideController.startRide
)   

module.exports = router;