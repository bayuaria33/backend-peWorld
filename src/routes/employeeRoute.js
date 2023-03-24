const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const {getAllEmployee,getProfileEmployee,getDetailEmployee} = require("../controller/employeeController")

router.get('/all',getAllEmployee)
router.get('/:id',protect,getProfileEmployee)
router.get('/my-profile',protect, getDetailEmployee)
module.exports = router;