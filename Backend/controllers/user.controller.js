const userModel = require('../models/user.model');
const userService = require('../services/user.service');
const {validationResult} =require('express-validator');
const blacklistTokenModel = require('../models/blacklistToken.model');

module.exports.registerUser = async (req , res , next ) =>{
    // to perform actions incase any error in ther user.routes.js data validation
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    
    //once the validation isover fetched the data , hash the password and add the user 
    //to the db using the user service we created
    const { fullname , email , password } = req.body;
    const { firstname, lastname } = fullname;

    const isUserExist = await userModel.findOne({email});
    if(isUserExist){
        return res.status(400).json({message:'User already exits'});
    }

    const hashedPassword = await userModel.hashPassword(password);

    const user = await userService.createUser({
        firstname,
        lastname,
        email,
        password:hashedPassword
    });

    //generate the jwt token 
    const token = user.generateAuthToken()

    //also setting the token in cookies
    res.cookie('token',token);

    //send the response and the token to the user 
    res.status(201).json({ token , user });

}

module.exports.loginUser = async(req,res,next)=>{
    // to perform actions incase any error in ther user.routes.js data validation
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    const { email , password } = req.body;
    // frst check if email exists or not 
    const user = await userModel.findOne({email}).select('+password'); // asking the db to additionally add the password field using+

    if(!user){
        return res.status(401).json({message:'Invalid useremail or password'})
    }

    // check for password if its correct or not
    const isMatch = await user.comparePassword(password);
    if(!isMatch){
        return res.status(401).json({message:'Invalid useremail or password'})
    }

    //if everything is correct then generate the token and send the response
    const token = user.generateAuthToken();

    //also setting the token in cookies
    res.cookie('token',token);

    res.status(200).json({ token , user });
}

module.exports.getUserProfile = async(req,res,next)=>{
    res.status(200).json(req.user);
}

module.exports.logoutUser = async(req,res,next)=>{
    res.clearCookie('token');
    const token = res.cookies?.token || req.headers?.authorization.split(' ')[1];
    const isTokenExists = await blacklistTokenModel.findOne({token})
    if(isTokenExists){
       return res.status(200).json({message:'Logged Out !'})
    }
    await blacklistTokenModel.create({token}); // to push the token in the db
    res.status(200).json({message:'Logged Out'})
}