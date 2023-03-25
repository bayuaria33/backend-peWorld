const express = require("express");
const router = express.Router();
const {getMyExperience,getExperienceById,insertExperience,updateExperience,deleteExperience} = require("../controller/experienceController");
const {protect} = require('../middleware/auth')

router.get('/myexp', protect, getMyExperience)
router.get('/:id',protect,getExperienceById)
router.post('/', protect, insertExperience)
router.put('/:id', protect, updateExperience)
router.delete('/:id', protect, deleteExperience)

module.exports = router;