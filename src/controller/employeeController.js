const {
  getAllEmployee,
  getDetailEmployee,
  getEmployee,
  updateEmployee,
} = require("../model/employeeModel");
const{
findUserById,
updateUser
} = require("../model/usersModel")
const cloudinary = require("../config/uploadconfig");
const EmployeeController = {
  getAllEmployee: async (req, res, next) => {
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
      let showEmployee = await getAllEmployee(data);
      if (showEmployee.rows.length === 0) {
        next(
          res
            .status(404)
            .json({ status: 404, message: `Employee data not found` })
        );
        return;
      }
      next(
        res.status(200).json({
          status: 200,
          message: `Employee data found`,
          data: showEmployee.rows,
        })
      );
    } catch (error) {
      return next(
        res
          .status(404)
          .json({
            status: 404,
            message: "Error getting data",
            data: error.message,
          })
      );
    }
  },
  getProfileEmployee: async (req, res, next) => {
    try {
      let id = req.payload.id;
      let data = {
        id,
      };

      let showEmployee = await getDetailEmployee(data);
      if (showEmployee.rows.length === 0) {
        next(
          res
            .status(404)
            .json({ status: 404, message: `Employee data not found` })
        );
        return;
      }
      next(
        res.status(200).json({
          status: 200,
          message: `Employee data found`,
          data: showEmployee.rows,
        })
      );
    } catch (error) {
      return next(
        res
          .status(404)
          .json({
            status: 404,
            message: "Error getting data",
            data: error.message,
          })
      );
    }
  },
  getDetailEmployee: async (req, res, next) => {
    try {
      let id = req.params.id;
      let data = {
        id,
      };
      let showEmployee = await getDetailEmployee(data);
      if (showEmployee.rows.length === 0) {
        next(
          res
            .status(404)
            .json({ status: 404, message: `Employee data not found` })
        );
        return;
      }
      next(
        res.status(200).json({
          status: 200,
          message: `Employee data found`,
          data: showEmployee.rows,
        })
      );
    } catch (error) {
      return next(
        res
          .status(404)
          .json({
            status: 404,
            message: "Error getting data",
            data: error.message,
          })
      );
    }
  },

  updateEmployee: async (req, res, next) => {
    try {
      let id = req.payload.id;
      let {
        rows: [employee],
      } = await getEmployee({id});
      
      let {
        rows: [users],
      } = await findUserById(id);

      if (!req.file) {
        req.body.employee_photo = employee.employee_photo;
      } else {
        // console.log('req valid',req.isFileValid)
        if (!req.isFileValid) {
          return res
            .status(404)
            .json({
              status: 404,
              message: `${req.isFileValidMessage || `File type invalid`}`,
            });
        }
        const imageUrl = await cloudinary.uploader.upload(req.file.path, {
          folder: "peworld_images",
        });
        if (!imageUrl) {
          next(
            res
              .status(404)
              .json({
                status: 404,
                message: `Update data failed, failed to upload photo`,
              })
          );
        }
        req.body.employee_photo = imageUrl.secure_url;
      }

      let data_employee = {
        employee_photo: req.body.employee_photo || employee.employee_photo,
        employee_job: req.body.employee_job || employee.employee_job,
        employee_description: req.body.employee_description || employee.employee_description,
        province_name: req.body.province_name || employee.province_name,
        city_name: req.body.city_name || employee.city_name,
        github: req.body.github || employee.github,
        linkedin: req.body.linkedin || employee.linkedin,
        instagram: req.body.instagram || employee.instagram
      };

      let data_user = {
        name: req.body.name || users.name,
        email: req.body.email || users.email,
        phone: req.body.phone || users.phone
      }
      let result_user = await updateUser(id, data_user);
      let result_employee = await updateEmployee(id, data_employee);
      if (!(result_employee && result_user)) {
        return next(
          res
            .status(404)
            .json({ status: 404, message: "Update data employee failed" })
        );
      }
      let {
        rows: [checkEmployee],
      } = await getEmployee(id);
      next(
        res.status(200).json({
          status: 200,
          message: `Update data employee successful`,
          data: checkEmployee,
        })
      );
    } catch (error) {
      return next(
        res
          .status(404)
          .json({
            status: 404,
            message: "Error updating data",
            data: error.message
          })
      );
    }
  },
};

module.exports = EmployeeController;
