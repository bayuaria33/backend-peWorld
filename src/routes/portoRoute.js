const express = require("express");
const router = express.Router();
const {getMyPorto, postPorto, updatePorto, delPorto} = require("../controller/portoController");
const {protect} = require('../middleware/auth')

router.get('/myporto', protect, getMyPorto)
router.post('/', protect, postPorto)
router.put('/:id', protect, updatePorto)
router.delete('/:id', protect, delPorto)

module.exports = router;