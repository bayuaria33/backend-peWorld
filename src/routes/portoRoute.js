const express = require("express");
const router = express.Router();
const {getMyPorto, postPorto} = require("../controller/portoController");
const {protect} = require('../middleware/auth')

router.get('/myporto', protect, getMyPorto)
router.post('/', protect, postPorto)

module.exports = router;