const {selectPortoByUserId, insertPorto, updatePorto, deletePorto} = require('../model/portoModel');

const portoController = {
    getMyPorto: async (req, res) => {
        let id = req.payload.id;
        let response = await selectPortoByUserId(id);
        console.log(response);
        if (!response) {
            return res.status(400).json({msg: "failed get my porto"});
        }
        return res.status(200).json({msg: "success get my porto", data: response.rows});
    },
    postPorto: async (req, res) => {
        let data = {};
        data.porto_title = req.body.porto_title;
        data.porto_link = req.body.porto_link;
        data.porto_photo = req.body.porto_photo;
        data.porto_type = req.body.porto_type;
        data.users_id = req.payload.id;
        let response = await insertPorto(data);
        if (!response) {
            return res.status(401).json({msg: "failed post porto"});
        }
        return res.status(201).json({msg: "success post porto"});
    },
    updatePorto: async (req, res) => {
        let id = req.params.id;
        let data = {};
        data.porto_title = req.body.porto_title;
        data.porto_link = req.body.porto_link;
        data.porto_photo = req.body.porto_photo;
        data.porto_type = req.body.porto_type;
        data.users_id = req.payload.id;
        let response = await updatePorto(id, data);
        if (!response) {
            return res.status(401).json({msg: "failed update porto"});
        }
        return res.status(201).json({msg: "success update porto"});
    },
    delPorto: async (req, res) => {
        let id = req.params.id;
        let users_id = req.payload.id;
        let response = await deletePorto(id, users_id);
        if (!response) {
            return res.status(400).json({msg: "failed delete porto"});
        }
        return res.status(200).json({msg: "success delete porto"});
    }
}

module.exports = portoController;