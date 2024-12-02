const userModel = require('../models/captain.model');

module.exports.createCaptain = async({firstname , lastname ,email , password , vehicle}) =>{
    if (!firstname || !email || !password || !vehicle.color || !vehicle.plate || !vehicle.capacity || !vehicle.vehicleType) {
        throw new Error('All fields are required');
    }
    const Captain = userModel.create({
        fullname:{
            firstname , 
            lastname
        },
        email, 
        password,
        vehicle:{
            color: vehicle.color,
            plate: vehicle.plate,
            capacity: vehicle.capacity,
            vehicleType: vehicle.vehicleType // Ensure vehicleType is passed
        }
    })
    return Captain
}