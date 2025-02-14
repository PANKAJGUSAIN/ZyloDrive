const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userSchema = new mongoose.Schema({
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
        minlength:[5 ,'Email must be 5 characters long']
    },
    password:{
        type:String,
        required:true,
        select:false, // doesn't need to come everytime we ask to find a user
    },
    socketId:{
        type:String
    }
})

// to generate auth token
userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id : this._id},process.env.JWT_SECRET , { expiresIn : '24h'})
    return token;
}

// to compare the passwords
userSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password , this.password )
}

// to convert the password into a hashpassword
userSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
}

const userModel = mongoose.model('user', userSchema , 'users');

module.exports = userModel;
