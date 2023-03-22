const { v4: uuidv4 } = require("uuid");
const argon2 = require("argon2");
// const {
//   generateAccessToken,
//   generateRefreshToken,
// } = require("../helpers/generateToken");
const {
  createUser,
  findUser,
  createEmployer,
  createEmployee,
} = require("../model/usersModel");

const UsersController = {
  registerUser: async (req, res, next) => {
    try {
      if (!req.body.email || !req.body.password || !req.body.name) {
        next(res.status(404).json({status:404,message:`Email / Password / Name missing`}))
        return;
      }
      let role = req.params.role;
      let {
        rows: [users],
      } = await findUser(req.body.email);
      if (users) {
        next(res.status(401).json({status:404,message:`Email is registered, you may login`}))
        return;
      }
      let id = uuidv4();
      let otp = Math.floor(100000 + Math.random() * 900000);
      let password1 = argon2.hash(req.body.password);
      let password2 = req.body.password;
      let password_confirm = req.body.confirm;
      if (password2 !== password_confirm) {
        return next(res.status(404).json({status:404,message:`Confirmed password is incorrect`}))
      }
      let data = {
        id,
        name: req.body.name,
        email: req.body.email,
        password: password1,
        phone: req.body.phone,
        role,
        otp,
      };
      let company_data = {
        id,
        company_name: req.body.company_name,
      };
      const result = createUser(data);
      try {
        if (role === "employer") {
          await createEmployer(company_data);
        } else if (role === "employee") {
          await createEmployee(data);
        }
      } catch (error) {
        next(res.status(404).json({status:404,message:error.message}));
      }
      if (result) {
        return res.status(201).json({status:200,message:`Register Success`, data:result.rows})
     }
      
    } catch (error) {
      next(res.status(404).json({status:404,message:error.message}));
    }
  },
};

module.exports = UsersController;
