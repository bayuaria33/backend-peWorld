const express = require("express");
const router = express.Router();
const UsersRoute = require("../routes/usersRoute")
const EmployeeRoute = require("../routes/employeeRoute")
router.use("/users",UsersRoute)
router.use("/employee",EmployeeRoute)
module.exports = router;