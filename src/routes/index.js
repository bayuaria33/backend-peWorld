const express = require("express");
const router = express.Router();
const UsersRoute = require("../routes/usersRoute")
const PortoRoute = require("../routes/portoRoute")
const EmployeeRoute = require("../routes/employeeRoute")
const EmployerRoute = require("../routes/employerRoute")

router.use("/users",UsersRoute)
router.use("/employee",EmployeeRoute)
router.use("/employer",EmployerRoute)
router.use("/porto", PortoRoute)
module.exports = router;