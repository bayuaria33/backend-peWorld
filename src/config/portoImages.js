const cloudinary = require('cloudinary').v2

cloudinary.config({
    cloud_name: process.env.IMAGE_NAME_PORTO,
    api_key: process.env.IMAGE_KEY_PORTO,
    api_secret: process.env.IMAGE_SECRET_PORTO
})

module.exports = cloudinary