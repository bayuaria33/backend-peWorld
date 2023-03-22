const express = require("express");
const router = express.Router();
const {registerUser} = require("../controller/usersController")

router.post('/register/:role', registerUser)

module.exports = router;