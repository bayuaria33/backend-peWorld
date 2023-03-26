const express = require("express");
const router = express.Router();
const UsersRoute = require("../routes/usersRoute")
const PortoRoute = require("../routes/portoRoute")
const EmployeeRoute = require("../routes/employeeRoute")
const EmployerRoute = require("../routes/employerRoute")
const ExperienceRouter = require("../routes/experienceRouter")
const SkillController = require("../routes/skillRoute")

router.use("/users",UsersRoute)
router.use("/employee",EmployeeRoute)
router.use("/employer",EmployerRoute)
router.use("/porto", PortoRoute)
router.use("/exp", ExperienceRouter)
router.use("/skill", SkillController)
module.exports = router;