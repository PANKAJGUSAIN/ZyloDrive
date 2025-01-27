const { validationResult } = require('express-validator');
const rideService = require('../services/ride.service');
const mapService = require('../services/map.service');
const { sendMessageToSocketId } = require('../socket');

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

        // Call getAdressCoordinate in the background (after the response is sent)
        (async () => {
            try {
                // Fetch coordinates for pickup
                const pickupCoordinates = await mapService.getAdressCoordinate(pickup);
                console.log(pickupCoordinates);

                // Fetch captains in a 5km radius
                const captainsInRadius = await mapService.getCaptains(pickupCoordinates.ltd , pickupCoordinates.lng , 5 ); 
                
                // setting otp to null for the ride  before sending to captains
                ride.otp = ""

                // Send ride request to captains
                captainsInRadius.map(captain => {
                    // Send ride request to captain
                    sendMessageToSocketId(captain.socketId, {
                        event:'new-ride',
                        data: ride
                    });
                });

                console.log(captainsInRadius);
            } catch (error) {
                console.log('Error fetching coordinates:', error);
            }
        })();
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
