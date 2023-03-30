const express = require("express");
const router = express.Router();
const {insertHire, getHirebyEmployer, getMessageByHire, insertMessage, getHirebyEmployee} = require("../controller/hireController");
const {protect} = require('../middleware/auth')

router.get("/myhire", protect, getHirebyEmployer)
router.get("/mymsg", protect, getHirebyEmployee)
router.get("/messages/:hire_id", getMessageByHire)
router.post("/messages/:hire_id",protect, insertMessage)
router.post('/:id', protect, insertHire)
module.exports = router;