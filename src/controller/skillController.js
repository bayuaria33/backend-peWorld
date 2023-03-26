const {selectSkillByUserId, insertSkill, updateSkill, deleteSkill} = require('../model/skillModel');


const skillController = {
    getMySkill: async (req, res) => {
        let id = req.params.id;
        let response = await selectSkillByUserId(id);
        // console.log(response);
        if (!response) {
            return res.status(400).json({msg: "failed get my skill"});
        }
        return res.status(200).json({msg: "success get my skill", data: response.rows});
    },
    postSkill: async (req, res) => {
        let data = {};
        data.skills = req.body.skills;
        data.users_id = req.payload.id;
        let response = await insertSkill(data);
        if (!response) {
            return res.status(401).json({msg: "failed post skill"});
        }
        return res.status(201).json({msg: "success post skill"});
    },
    updateSkill: async (req, res) => {
        let id = req.params.id;
        let data = {};
        data.skills = req.body.skills;
        data.users_id = req.payload.id;
        let response = await updateSkill(id, data);
        if (!response) {
            return res.status(401).json({msg: "failed update skill"});
        }
        return res.status(201).json({msg: "success update skill"});
    },
    delSkill: async (req, res) => {
        let id = req.params.id;
        let users_id = req.payload.id;
        let response = await deleteSkill(id, users_id);
        if (!response) {
            return res.status(400).json({msg: "failed delete skill"});
        }
        return res.status(200).json({msg: "success delete skill"});
    }
}

module.exports = skillController;