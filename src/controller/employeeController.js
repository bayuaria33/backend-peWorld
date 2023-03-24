const {
  getAllEmployee,
  getDetailEmployee
} = require("../model/employeeModel");

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
          data: showEmployee.rows
        })
      );
    } catch (error) {
      return next(
        res.status(404).json({ status: 404, message: 'Error getting data', data:error.message})
      );
    }
  },
  getProfileEmployee: async (req, res, next) => {
    try {
      let id = req.payload.id;
      let data = {
        id
      };

      let showEmployee = await getDetailEmployee(data);
      if (showEmployee.rows.length === 0) {
        next(
          res
            .status(404)
            .json({ status: 404, message: `Employee data not found`})
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
        res.status(404).json({ status: 404, message: 'Error getting data', data:error.message})
      );
    }
  },
  getDetailEmployee: async (req, res, next) => {
    try {
      let id = req.params.id;
      let data = {
        id
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
        res.status(404).json({ status: 404, message: 'Error getting data', data:error.message})
      );
    }
  },
};

module.exports = EmployeeController;
