const jwt = require('jsonwebtoken');

const User = require('../models/userModel');
const sendEmail = require('../utils/sendEmail');

// genrater token
const generateToken = (id)=>{
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn:'24h',
    });
};

// register controller
const register = async (req,res)=>{
    const {name, email, password} = req.body;
    try{
        // input type check
        if (
            typeof name !== "string"||
            typeof email !== "string"||
            typeof password !== "string"
        ) {
            return res.status(400).json({message: "invalid input"});
        }
        // no duplicate
        const lowerEmail = email.toLowerCase().trim();

        // if user already exists
        const userEx = await User.findOne({email: lowerEmail});
        if(userEx){
            return res.status(400).json({message: 'User already exists'});
        }
        // if user ont exist
        const user = await User.create({
            name,
            email: lowerEmail,
            password,
        });
        if(user) {
           return res.status(201).json({
            message: "Registration Successful! Please Login to verify your account."
           });
        }
    } catch (err){
        res.status(500).json({message: "server error"});
    }
};

// login controller
const login = async (req,res)=>{
    const {email, password} = req.body;
    try{
        // type check
        if(
            typeof email !== "string" ||
            typeof password !== "string"
        ) {
            return res.status(400).json({message: "Invalid input"});
        }
        // no duplicate
        const lowerEmail = email.toLowerCase().trim();

        // find user
        const user = await User.findOne({email: lowerEmail});
        if(user && (await user.matchPassword(password))){

            // generating otp
            const otp = Math.floor(100000 + Math.random() * 900000).toString();
            const otpExpires = Date.now() + 1 * 60 * 1000;
            
            await User.updateOne(
                {_id:user._id},
                {$set:{otp:otp, otpExpires:otpExpires}}
            );

            // send email
            await sendEmail(user.email, otp);
            res.json({
                message: "OTP sent to your email (Expires in 1 min)",
                email: user.email,
                require:true
            });
        } else{ 
            res.status(401).json({message: 'Invalid email or password'});
        }
    } catch (err){
        res.status(500).json({message: err.message});
    }
};

// OTP veriy
const verifyOTP = async (req,res) => {
    const {email, otp} = req.body;
    try{
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message: "User not found"});
        } 
        console.log("Input OTP:", otp, "| Type:", typeof otp);
        console.log("DB OTP:", user.otp, "| Type:", typeof user.otp);
        console.log("Current Time:", Date.now());
        console.log("Expiry Time:", user.otpExpires ? user.otpExpires.getTime() : "No Expiry");
        console.log("Match?", user.otp === otp);
        console.log("Not Expired?", user.otpExpires > Date.now());

        // otp check
        if (user.otp === otp && user.otpExpires > Date.now()){
            // clearing otp
            user.otp = undefined;
            user.otpExpires = undefined;
            await user.save();
            // send token
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id),
                message: "Login Successful!"
            });
        } else{
            res.status(400).json({message:"Invalid or expired OTP"});
        }
    } catch(err){
        console.log(err);
        res.status(500).json({message:"Server Error"});
    }
};

module.exports = {register, login, verifyOTP};
