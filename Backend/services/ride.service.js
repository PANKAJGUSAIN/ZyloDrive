const rideModel = require('../models/ride.model');
const mapService = require('../services/map.service');
const crypto = require('crypto');


async function getFare(pickup, destination) {
    if (!pickup || !destination) {
        throw new Error('Pickup and destination are required');
    }
    const distanceTime = await mapService.getDistanceTime(pickup, destination);

    const baseFare = {
        auto: 50,
        car: 100,
        motorcycle: 30
    }

    const perkmfare = {
        auto: 10,
        car: 20,
        motorcycle: 5
    }

    const perminfare = {
        auto: 1,
        car: 2,
        motorcycle: 1
    }
    const fare = {
        auto: (baseFare.auto + (distanceTime.distance.value / 1000) * perkmfare.auto + (distanceTime.duration.value / 60) * perminfare.auto).toFixed(2),
        car: (baseFare.car + (distanceTime.distance.value / 1000) * perkmfare.car + (distanceTime.duration.value / 60) * perminfare.car).toFixed(2),
        motorcycle: (baseFare.motorcycle + (distanceTime.distance.value / 1000) * perkmfare.motorcycle + (distanceTime.duration.value / 60) * perminfare.motorcycle).toFixed(2)
    }


    return fare;
}

module.exports.getFare = getFare;

function getOTP(num) {

    function generateOTP(num) {
        //use crypto to generate random number
        const otp = crypto.randomInt(Math.pow(10, num - 1), Math.pow(10, num) - 1).toString();
        return otp;
    }

    return generateOTP(num);
}


module.exports.createRide = async ({user , pickup , destination , vehicleType}) => {
    if(!user || !pickup || !destination || !vehicleType){
        throw new Error('User, pickup, destination and vehicle are required');
    }
    const fare = await getFare(pickup, destination);
    const ride = rideModel.create({
        user,
        pickup,
        destination,
        fare: fare[vehicleType],
        status: 'pending',
        otp: getOTP(6),
    });
    return ride;
}

