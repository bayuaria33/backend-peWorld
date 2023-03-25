const express = require("express");
const router = express.Router();
const UsersRoute = require("../routes/usersRoute")
const PortoRoute = require("../routes/portoRoute")
const EmployeeRoute = require("../routes/employeeRoute")
const EmployerRoute = require("../routes/employerRoute")
const ExperienceRouter = require("../routes/experienceRouter")

router.use("/users",UsersRoute)
router.use("/employee",EmployeeRoute)
router.use("/employer",EmployerRoute)
router.use("/porto", PortoRoute)
router.use("/exp", ExperienceRouter)
module.exports = router;