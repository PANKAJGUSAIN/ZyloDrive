const { validationResult } = require('express-validator');
const rideService = require('../services/ride.service');

// for creating ride
module.exports.createRide = async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ message: error.array() });
    }

    const { pickup, destination, vehicleType } = req.body;


    try {
        const ride = await rideService.createRide({user:req.user._id, pickup, destination, vehicleType});
        res.status(201).json(ride);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// for fetching fares of ride based on pickup and destination
module.exports.getFare = async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ message: error.array() });
    }

    const { pickup, destination } = req.query;

    try {
        const fare = await rideService.getFare(pickup, destination);
        res.status(200).json(fare);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
