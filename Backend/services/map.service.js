const captainModel = require('../models/captain.model');

// fetch address co-ordinate 
//accepts address 
module.exports.getAdressCoordinate  = async (address) => {
    
    try{
        const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.GOOGLE_MAPS_API}`);
        const data = await response.json();
        // console.log(JSON.stringify(data));
        if(data.status === "OK"){
            const location = data.results[0].geometry.location;
            return {
                ltd: location.lat,
                lng: location.lng
            };
        }else{
            throw new Error('Unable to fetch coordinates')
        }
    } catch(error){
        console.log(error);
        throw error;
    }
}


// to fetch the distance between two points
// accepts two object with ltd and lng
module.exports.getDistanceTime = async (origin , destination) => {
    if(!origin || !destination){
        throw new Error('Origin and destination are required');
    }

    try {
        const response = await fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${destination}&key=${process.env.GOOGLE_MAPS_API}`);
        const data = await response.json();
        if (data.status === "OK") {
            if (data.rows[0].elements[0].status === 'ZERO_RESULTS') {
                throw new Error('No routes found');
            }
            const result = data.rows[0].elements[0];
            return result;
        } else {
            throw new Error('Unable to fetch distance and time');
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}


// to fetch suggestions
// accepts address
module.exports.getAutoCompleteSuggestions = async (address) => {
    if(!address){
        throw new Error('Address is required');
    }

    try{
        const response = await fetch(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${address}&key=${process.env.GOOGLE_MAPS_API}`);
        const data = await response.json();
        if(data.status === "OK"){
            return data.predictions;
        }else{
            throw new Error('Unable to fetch suggestions');
        }
    }catch(error){
        console.log(error);
        throw error;
    }
}

module.exports.getCaptains =  async ( ltd , lng , radius ) => {
    console.log(ltd,lng,radius);

    // radius in km

    const captains = await  captainModel.find({
        location:{
            $geoWithin:{
                $centerSphere:[[ltd,lng],radius/6378.1]
            }
        }
    });

    return captains
}