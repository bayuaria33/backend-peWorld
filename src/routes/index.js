const express = require("express");
const router = express.Router();
const UsersRoute = require("../routes/usersRoute")
const PortoRoute = require("../routes/portoRoute")

router.use("/users",UsersRoute)
router.use("/porto", PortoRoute)

module.exports = router;