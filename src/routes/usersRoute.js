const express = require("express");
const router = express.Router();
const {registerUser,verifyUser,loginUser} = require("../controller/usersController")

router.post('/register/:role', registerUser)
router.post('/verify',verifyUser)
router.post('/login',loginUser)

module.exports = router;