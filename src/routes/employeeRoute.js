const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const { upload } = require("../middleware/upload");
const {getAllEmployee,getProfileEmployee,getDetailEmployee, updateEmployee} = require("../controller/employeeController")

router.get('/all',getAllEmployee)
router.get('/:id',protect,getProfileEmployee)
router.get('/my-profile',protect, getDetailEmployee)
router.put('/update-profile',protect,upload.single("employee_photo"), updateEmployee)
module.exports = router;