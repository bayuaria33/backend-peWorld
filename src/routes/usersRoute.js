const express = require("express");
const router = express.Router();
const {registerUser,verifyUser,login} = require("../controller/usersController")

router.post('/register/:role', registerUser)
router.post('/verify',verifyUser)
router.post('/login',login)

module.exports = router;