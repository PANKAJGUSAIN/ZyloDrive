const { validationResult } = require('express-validator');
const blacklistTokenModel = require('../models/blacklistToken.model');
const captainModel = require('../models/captain.model');
const captainService = require('../services/captain.service');

module.exports.registerCaptain = async (req , res , next ) =>{
    // to perform actions incase any error in ther user.routes.js data validation
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    
    //once the validation isover fetched the data , hash the password and add the user 
    //to the db using the user service we created
    const { fullname , email , password , vehicle } = req.body;
    const { firstname, lastname } = fullname;

    const isCaptainExist = await captainModel.findOne({email});
    if(isCaptainExist){
        return res.status(400).json({message:'User already exits'});
    }

    const hashedPassword = await captainModel.hashPassword(password);

    const captain = await captainService.createCaptain({
        firstname,
        lastname,
        email,
        vehicle,
        password:hashedPassword
    });

    //generate the jwt token 
    const token = captain.generateAuthToken()

    //also setting the token in cookies
    res.cookie('token',token);

    //send the response and the token to the user 
    res.status(201).json({ token , captain });

}

module.exports.loginCaptain = async(req,res,next)=>{
    // to perform actions incase any error in ther user.routes.js data validation
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    const { email , password } = req.body;
    // frst check if email exists or not 
    const captain = await captainModel.findOne({email}).select('+password'); // asking the db to additionally add the password field using+

    if(!captain){
        return res.status(401).json({message:'Invalid useremail or password'})
    }

    // check for password if its correct or not
    const isMatch = await captain.comparePassword(password);
    if(!isMatch){
        return res.status(401).json({message:'Invalid useremail or password'})
    }

    //if everything is correct then generate the token and send the response
    const token = captain.generateAuthToken();

    //also setting the token in cookies
    res.cookie('token',token);

    res.status(200).json({ token , captain });
}

module.exports.getCaptainProfile = async(req,res,next)=>{
    res.status(200).json(req.captain);
}

module.exports.logoutCaptain = async(req,res,next)=>{
    res.clearCookie('token');
    const token = res.cookies?.token || req.headers?.authorization.split(' ')[1];
    await blacklistTokenModel.create({token}); // to push the token in the db
    res.status(200).json({message:'Logged Out'})
}