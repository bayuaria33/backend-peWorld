const express = require("express");
const router = express.Router();
const {registerUser,verifyUser,login, getOTPbyEmail, verifyEmailOTP, changePassword} = require("../controller/usersController")

router.post('/register/:role', registerUser)
router.post('/verify',verifyUser)
router.post('/login',login)
router.post('/otp' , getOTPbyEmail)
router.post('/otp/confirm' , verifyEmailOTP)
router.post('/resetPassword', changePassword)

module.exports = router;