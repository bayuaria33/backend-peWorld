const express = require("express");
const router = express.Router();
const {getMyPorto, postPorto, updatePorto, delPorto} = require("../controller/portoController");
const {protect} = require('../middleware/auth')
const upload = require('../middleware/uploadFilePorto')

router.get('/myporto', protect, getMyPorto)
router.post('/', protect, upload.single('porto_photo'), postPorto)
router.put('/:id', protect, upload.single('porto_photo'), updatePorto)
router.delete('/:id', protect, delPorto)

module.exports = router;