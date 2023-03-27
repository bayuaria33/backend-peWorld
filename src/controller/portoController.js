const {selectPortoByUserId, insertPorto, updatePorto, deletePorto, selectPortoByPortoId} = require('../model/portoModel');
const cloudinary = require('../config/portoImages');

const portoController = {
    getMyPorto: async (req, res) => {
        let id = req.payload.id;
        let response = await selectPortoByUserId(id);
        // console.log(response);
        if (!response) {
            return res.status(400).json({msg: "failed get my porto"});
        }
        return res.status(200).json({msg: "success get my porto", data: response.rows});
    },
    getPortoById: async (req, res) => {
        try {          
            let id = req.params.id;
            let response = await selectPortoByPortoId(id)
            // console.log(response);
            if (response.rows.length === 0) {
                return res.status(400).json({msg: `Failed getting porto ${id} , doesn't exist`});
            }
            return res.status(200).json({msg: "success get my porto", data: response.rows});
        } catch (error) {
            return res.status(400).json({msg: error.message, data: error.data});
        }
    },
    postPorto: async (req, res) => {
        const imageUrl = await cloudinary.uploader.upload(req.file.path, {folder: 'peworld-porto'})
        // console.log(imageUrl);
        let data = {};
        data.porto_title = req.body.porto_title;
        data.porto_link = req.body.porto_link;
        data.porto_photo = imageUrl.secure_url;
        data.porto_type = req.body.porto_type;
        data.users_id = req.payload.id;
        let response = await insertPorto(data);
        if (!response) {
            return res.status(401).json({msg: "failed post porto"});
        }
        return res.status(201).json({msg: "success post porto"});
    },
    updatePorto: async (req, res) => {
        const imageUrl = await cloudinary.uploader.upload(req.file.path, {folder: 'peworld-porto'})
        let id = req.params.id;
        let data = {};
        data.porto_title = req.body.porto_title;
        data.porto_link = req.body.porto_link;
        data.porto_photo = imageUrl.secure_url;
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