const express = require('express');
const router = express.Router();

const {register, login, verifyOTP} = require('../controllers/userController');
const loginLimiter = require("../middleware/loginLimiter"); 

// register rout
// you can acess this api by going to "http://localhost:5000/api/users/register"
router.post('/register',register);

// login rout
// you can acess this api by going to "http://localhost:5000/api/users/login"
router.post('/login', loginLimiter, login);

// verify rout
// you can acess this api by going to "http://localhost:5000/api/users/verifyOTP"
router.post('/verifyOTP', verifyOTP);


module.exports = router;
