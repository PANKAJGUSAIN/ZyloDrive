const mongoose = require('mongoose');


const rideSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    captain:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'captain',
    },
    destination:{
        type: String,
        required: true
    },
    pickup:{
        type: String,
        required: true
    },
    fare:{
        type: Number,
        required: true
    },
    status:{
        type: String,
        enum: ['pending', 'accepted','ongoing', 'completed', 'cancelled'],
        default: 'pending'
    },
    duration:{
        type: Number,
    }, // in seconds
    distance:{
        type: Number,
    }, // in meters
    paymentID:{
        type: String,
    },
    orderID:{
        type: String,
    },
    signature:{
        type: String,
    },
    otp:{
        type: String,
        selected: false,
        required: true
    }

});

const rideModel = mongoose.model('ride', rideSchema , 'rides'); // model name, schema, collection name

module.exports= rideModel;