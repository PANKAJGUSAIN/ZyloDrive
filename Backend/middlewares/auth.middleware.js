const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');
const blacklistTokenModel = require('../models/blacklistToken.model');

//middleware which authenticating using token and then moving to next 
module.exports.authUser = async(req,res,next) =>{
    const token = req.cookies?.token || req.headers?.authorization?.split(' ')[1];
    if(!token){
        return res.status(401).json({message:'UnAuthorized'})
    }

    // to check if token is blacklisted 
    const isBlacklisted = await blacklistTokenModel.findOne({token:token});
    if(isBlacklisted){
        return res.status(401).json({message:'UnAuthorized Acesss !'})
    }

    try{
        const decode = jwt.verify(token , process.env.JWT_SECRET);
        const user = await userModel.findById(decode._id);
        req.user = user;
        return next();
    }
    catch(err){
        return res.status(401).json({message:'UnAuthorizedddd'})
    }
}