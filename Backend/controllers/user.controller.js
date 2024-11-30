const userModal = require('../models/user.model');
const userService = require('../services/user.service');
const {validationResult} =require('express-validator');

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

    const hashedPassword = await userModal.hashPassword(password);

    const user = await userService.createUser({
        firstname,
        lastname,
        email,
        password:hashedPassword
    });

    //generate the jwt token 
    const token = user.generateAuthToken()

    //send the response and the token to the user 
    res.status(201).json({ token , user });

}