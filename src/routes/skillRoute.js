const express = require("express");
const router = express.Router();
const {getSkillbySkillId, getMySkill, postSkill, updateSkill, delSkill} = require("../controller/skillController");
const {protect} = require('../middleware/auth')

router.get('/myskill', protect, getMySkill)
router.get('/:id', getSkillbySkillId)
router.post('/', protect, postSkill)
router.put('/:id', protect, updateSkill)
router.delete('/:id', protect, delSkill)

module.exports = router;