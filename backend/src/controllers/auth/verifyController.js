const User = require('../../models/userModel');
const jwt = require('jsonwebtoken');

// genrater token
const generateToken = (id)=>{
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn:'24h',
    });
};

// OTP veriy
const verifyOTP = async (req,res) => {
    const {email, otp} = req.body;
    try{
        if (!email || !otp) {
            return res.status(400).json({message:"Email and OTP required"})
        }

        const lowerEmail = email.toLowerCase().trim();
        const user = await User.findOne({email: lowerEmail});

        if(!user || !user.otp){
            return res.status(400).json({message: "Invalid request"});
        }
        
        if (user.otpExpires < Date.now()){
            return res.status(400).json({message:"OTP expired"})
        }
        if(user.otp !== otp){
            return res.status(400).json({message:"Invaild OTP"});
        }

        // otp clear
        user.otp = undefined;
        user.otpExpires = undefined;
        await user.save();
        
        // send token
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
            message: "Login Successful!"
        });
        
    } catch(err){
        console.log(err);
        res.status(500).json({message:"Server Error"});
    }
};

module.exports = {verifyOTP};
