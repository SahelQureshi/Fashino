const jwt=require('jsonwebtoken');
const userModel=require('../models/user-model')

module.exports.isLoggedIn=async(req,res,next)=>{
    if(!req.cookies.token){
        req.flash('error',"Sorry to say but You need to login First!")
        return res.redirect('/users/login');
    }

    try {

        let decode=jwt.verify(req.cookies.token,process.env.JWT_KEY)
        let user=await userModel.findOne({email:decode.email}).select("-password");
        req.user=user;
        next();
        
    } catch (error) {
        req.flash(error.message,"Something Went Wrong!")
        return res.redirect('/users/login');

        
    }

}