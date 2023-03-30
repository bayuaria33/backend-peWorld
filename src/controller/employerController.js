const {
  getAllEmployer,
  getDetailEmployer,
  getEmployer,
  updateEmployer,
} = require("../model/employerModel");
const cloudinary = require("../config/uploadconfig");
const { updateUser, findUserById } = require("../model/usersModel");
const EmployerController = {
  getAllEmployer: async (req, res) => {
    try {
      let { searchBy, search, sortBy, sort } = req.query;
      let data = {
        searchBy: searchBy || "name",
        search: search || "",
        sortBy: sortBy || "created_at",
        sort: sort || "ASC",
      };
      data.page = parseInt(req.query.page) || 1;
      data.limit = parseInt(req.query.limit) || 10;
      data.offset = (data.page - 1) * data.limit;
      let showEmployer = await getAllEmployer(data);
      if (showEmployer.rows.length === 0) {
        return res
          .status(404)
          .json({ status: 404, message: `Employer data not found` });
        
      }

      return res.status(200).json({
        status: 200,
        message: `Employer data found`,
        data: showEmployer.rows,
      });
    } catch (error) {
      return res.status(404).json({
        status: 404,
        message: "Error getting data",
        data: error.message,
      });
    }
  },
  getProfileEmployer: async (req, res) => {
    try {
      let id = req.payload.id;
      let data = {
        id,
      };

      let showEmployer = await getDetailEmployer(data);
      if (showEmployer.rows.length === 0) {
        return res
          .status(404)
          .json({ status: 404, message: `Employer data not found` });
      }

      return res.status(200).json({
        status: 200,
        message: `Employer data found`,
        data: showEmployer.rows,
      });
    } catch (error) {
      return res.status(404).json({
        status: 404,
        message: "Error getting data",
        data: error.message,
      });
    }
  },
  getDetailEmployer: async (req, res, next) => {
    try {
      let id = req.params.id;
      let data = {
        id,
      };
      try {
        let showEmployer = await getDetailEmployer(data);
        if (showEmployer.rows.length === 0) {
          return next(
            res
              .status(404)
              .json({ status: 404, message: `Employer data not found` })
          );
        }

        return next(
          res.status(200).json({
            status: 200,
            message: `Employee data found`,
            data: showEmployer.rows,
          })
        );
      } catch (error) {
        return next(
          res.status(404).json({
            status: 404,
            message: "Error getting data",
            data: error.message,
          })
        );
      }
    } catch (error) {
      return next(
        res.status(404).json({
          status: 404,
          message: "Error getting data",
          data: error.message,
        })
      );
    }
  },

  updateEmployer: async (req, res, next) => {
    try {
      let id = req.payload.id;
      let {
        rows: [employer],
      } = await getEmployer({ id });
      let {
        rows: [users],
      } = await findUserById(id);
      if (!req.file) {
        req.body.company_photo = employer.company_photo;
      } else {
        if (!req.isFileValid) {
          return res.status(404).json({
            status: 404,
            message: `${req.isFileValidMessage || `File type invalid`}`,
          });
        }
        const imageUrl = await cloudinary.uploader.upload(req.file.path, {
          folder: "peworld_images",
        });
        if (!imageUrl) {
          return next(
            res.status(404).json({
              status: 404,
              message: `Update data failed, failed to upload photo`,
            })
          );
        }
        req.body.company_photo = imageUrl.secure_url;
      }

      let data_employer = {
        company_email: req.body.company_email || employer.company_email,
        company_name: req.body.company_name || employer.company_name,
        company_photo: req.body.company_photo || employer.company_photo,
        company_field: req.body.company_field || employer.company_field,
        company_info: req.body.company_info || employer.company_info,
        province_name: req.body.province_name || employer.province_name,
        city_name: req.body.city_name || employer.city_name,
        position: req.body.position || employer.position,
      };

      let data_user = {
        name: req.body.name || users.name,
        email: req.body.email || users.email,
        phone: req.body.phone || users.phone
      }

      let result_employer = await updateEmployer(id, data_employer);
      let result_user = await updateUser(id,data_user)
      if (!(result_employer && result_user)) {
        return res
          .status(404)
          .json({ status: 404, message: "Update data employer failed" });
      }
      let {
        rows: [checkEmployer],
      } = await getEmployer(id);
      return res.status(200).json({
        status: 200,
        message: `Update data employer successful`,
        data: checkEmployer,
      });
    } catch (error) {
      return next(
        res.status(404).json({
          status: 404,
          message: "Error updating data",
          data: error.message,
        })
      );
    }
  },
};

module.exports = EmployerController;
