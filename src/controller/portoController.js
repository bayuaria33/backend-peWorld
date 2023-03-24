const {selectPortoByUserId, insertPorto} = require('../model/portoModel');

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
    }
}

module.exports = portoController;