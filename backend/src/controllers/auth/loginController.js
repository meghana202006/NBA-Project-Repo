const User = require('../../models/userModel');
const sendEmail = require('../../utils/sendEmail');
const genOTP = require('../../utils/otpGenerator');


// login controller
const login = async (req,res)=>{
    const {email, password} = req.body;
    try{
        // type check
        if(
            typeof email !== "string" ||
            typeof password !== "string"
        ) {
            console.log("hello")
            return res.status(400).json({message: "Invalid input"});
        }
        // no duplicate
        const lowerEmail = email.toLowerCase().trim();

        // find user
        const user = await User.findOne({email: lowerEmail});
        console.log(user)
        if(user && (await user.matchPassword(password))){

            const {otp, otpExpires} = genOTP();

            await User.updateOne(
                {_id:user._id},
                {$set:{otp:otp, otpExpires:otpExpires}}
            );

            // send email
            await sendEmail(user.email, otp);
            res.json({
                message: "OTP sent to your email (valid for 1 min)",
                email: user.email,
                requireOTP:true
            });
        } else{ 
            res.status(401).json({message: 'Invalid email or password'});
        }
    } catch (err){
        console.log(err)
        res.status(500).json({message: err.message});
    }
};

module.exports = {login};
