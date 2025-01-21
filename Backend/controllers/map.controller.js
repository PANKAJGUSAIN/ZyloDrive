const { validationResult } = require('express-validator');
const mapService = require('../services/map.service.js');

// get coordinates of an address
module.exports.getCoordinates = async (req  , res , next ) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    const {address} = req.query;
    try {
        const coordinates = await mapService.getAdressCoordinate(address);
        return res.status(200).send(coordinates);
    } catch (error) {
        return res.status(404).json({message: "Coordinates not found"});
    }
}

// get distance and time between two points
module.exports.getDistanceTime = async (req , res , next) => {  
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    const {origin , destination} = req.query;
    try {
        const distanceTime = await mapService.getDistanceTime(origin , destination);
        return res.status(200).send(distanceTime);
    } catch (error) {
        console.log(error);
        return res.status(400).json({message: error});
    }
}

// get suggestions for an address
module.exports.getAutoCompleteSuggestions = async (req , res , next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    const {address} = req.query;
    try {
        const suggestions = await mapService.getAutoCompleteSuggestions(address);
        return res.status(200).json(suggestions);
    } catch (error) {
        console.log(error);
        return res.status(400).json({message: error});
    }
}