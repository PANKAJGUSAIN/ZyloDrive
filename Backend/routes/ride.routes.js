const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const rideController = require('../controllers/ride.controller');
const authMiddleware = require('../middlewares/auth.middleware');


// who is the user ,pickup location ,drop location,type of ride
router.post('/create',  authMiddleware.authUser ,
    body('pickup').isString().isLength({min: 3}).withMessage('Invalid Pickup Location'),
    body('destination').isString().isLength({min: 1}).withMessage('Invalid destination Location'),
    body('vehicleType').isString().isIn(['auto', 'car', 'motorcycle']).withMessage('Invalid Vehicle Type'),
    rideController.createRide);

module.exports = router;