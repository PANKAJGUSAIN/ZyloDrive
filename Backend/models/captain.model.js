const mongoose =require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const captainSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength: [3, 'First name must be at least 3 characters long'],
        },
        lastname: {
            type: String,
            minlength: [3, 'Last name must be at least 3 characters long'],
        }
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        match:[ /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ ,'please enter a valid Email id']
    },
    password:{
        type:String,
        required:true,
        select:false, // doesn't need to come everytime we ask to find a user
    },
    socketId:{
        type:String
    },
    status:{ // to checker whether the driver(captain) is aviable to take the ride or not
        type:String,
        enum:['active','inactive'],
        default:'inactive',
    },
    vehicle:{ // vehicle details
        color:{
            type:String,
            required:true,
            minlength:[3,'Color must be at least 3 charcters long']
        },
        plate:{
            type:String,
            required:true,
            minlength:[3,'Plate must be at least 3 characters long']
        },
        capacity:{
            type:Number,
            required:true,
            minlength:[1, 'Capactiy must be at least 1 ']
        },
        vehicleType:{
            type:String,
            required:true,
            enum:['car','motorcycle','auto']

        }
    },
    location:{ // required is not true as as for the first time captain will be by default inactive so will have no location
        ltd:{
            type:Number, 
        },
        lng:{
            type:Number, 
        }
    }
})

// to generate auth token
captainSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id : this._id},process.env.JWT_SECRET , { expiresIn : '24h'})
    return token;
}

// to compare the passwords
captainSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password , this.password )
}

// to convert the password into a hashpassword
captainSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
}



const captainModel = mongoose.model('Captain',captainSchema,'Captain')

module.exports = captainModel;