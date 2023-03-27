const { v4: uuidv4 } = require("uuid");
const argon2 = require("argon2");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../helpers/generateToken");
const {
  createUser,
  findUser,
  verifyUser,
  createEmployer,
  createEmployee,
} = require("../model/usersModel");
const { getDetailEmployee } = require("../model/employeeModel");
const { getDetailEmployer } = require("../model/employerModel");

const UsersController = {
  registerUser: async (req, res, next) => {
    try {
      if (!req.body.email || !req.body.password || !req.body.name) {
        next(
          res
            .status(404)
            .json({ status: 404, message: `Email / Password / Name missing` })
        );
        return;
      }
      let role = req.params.role;
      let {
        rows: [users],
      } = await findUser(req.body.email);
      if (users) {
        next(
          res.status(401).json({
            status: 404,
            message: `Email is registered, you may login`,
          })
        );
        return;
      }
      let id = uuidv4();
      let otp = Math.floor(100000 + Math.random() * 900000);
      let password1 = await argon2.hash(req.body.password);
      let password2 = req.body.password;
      let password_confirm = req.body.confirm;
      if (password2 !== password_confirm) {
        return next(
          res
            .status(404)
            .json({ status: 404, message: `Confirmed password is incorrect` })
        );
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
        position: req.body.position
      };
      const result = createUser(data);
      try {
        if (role === "employer") {
          await createEmployer(company_data);
        } else if (role === "employee") {
          await createEmployee(data);
        }
      } catch (error) {
        next(res.status(404).json({ status: 404, message: error.message }));
      }
      if (result) {
        return res.status(201).json({
          status: 200,
          message: `Register Success`,
          data: result.rows,
        });
      }
    } catch (error) {
      next(res.status(404).json({ status: 404, message: error.message }));
    }
  },

  verifyUser: async (req, res, next) => {
    let email = req.body.email;
    let otp = req.body.otp;

    console.log(email, otp);
    if (!email || !otp) {
      return next(
        res.status(404).json({
          status: 404,
          message: `Email / OTP not inserted, please try again`,
        })
      );
    }

    let {
      rows: [users],
    } = await findUser(email);

    if (!users) {
      return next(
        res
          .status(404)
          .json({ status: 404, message: `User with email ${email} not found` })
      );
    }

    if (users.otp == otp) {
      let verif = await verifyUser(users.id);
      if (verif) {
        return next(
          res.status(404).json({
            status: 200,
            message: `User verified successfully`,
            data: req.body.email,
          })
        );
      } else {
        return next(
          res
            .status(404)
            .json({ status: 404, message: `User verification failed` })
        );
      }
    } else {
      return next(
        res
          .status(404)
          .json({ status: 404, message: `OTP Incorrect, please try again` })
      );
    }
  },

  loginUser: async (req, res, next) => {
    if (!req.body.email || !req.body.password) {
      next(
        res
          .status(404)
          .json({ status: 404, message: `Email / Password missing` })
      );
      return;
    }

    //get users to check the data
    let {
      rows: [users],
    } = await findUser(req.body.email);
    if (!users) {
      return next(
        res
          .status(404)
          .json({
            status: 404,
            message: `Login failed, user with email ${req.body.email} not found`,
          })
      );
    }
    let verifyPassword = await argon2.verify(users.password, req.body.password);
    let data = users;
    delete data.password;
    let accessToken = generateAccessToken(data);
    let refreshToken = generateRefreshToken(data);

    if (verifyPassword) {
      users.accessToken = accessToken;
      users.refreshToken = refreshToken;
      delete users.password;
      delete users.otp;
      delete users.created_at;
      if (!users.verified) {
        return next(
          res
            .status(400)
            .json({
              status: 404,
              message: `Login failed, please check your email to verify`,
            })
        );
      }
      return next(
        res
          .status(200)
          .json({
            status: 200,
            message: `Login successful, welcome ${users.name}`,
            data: users,
          })
      );
    }

    return next(res.status(404).json({ status: 404, message: `Login failed` }));
  },

  login: async (req,res)=>{
    try {
        if (!req.body.email || !req.body.password) {
            res.status(404).json({status:404,message:`Email / Password missing`})
        } 
          let {rows:[users]} = await findUser(req.body.email)
          if (!users) {
            res.status(404).json({status:404,message:`Login failed, user with email ${req.body.email} not found`})
          }
          let verifyPassword = await argon2.verify(users.password, req.body.password);
          if(!verifyPassword){
            res.status(404).json({status:404,message:`Login failed, wrong password`})
          }
          let role = users.role;
          
          if(role === "employee"){
            let data ={
              id:users.id
            }
            let {rows:[employee]} = await getDetailEmployee(data)
            let accessToken = generateAccessToken(users);
            let refreshToken = generateRefreshToken(users);
            console.log("accessToken", accessToken);
            employee.accessToken = accessToken
            employee.refreshToken = refreshToken
            employee.role = role
            return res.status(200).json({status:200,message:`Login success`,data:employee})
          }
          if(role === "employer"){
            let data ={
              id:users.id
            }
            let {rows:[employer]} = await getDetailEmployer(data)
            let accessToken = generateAccessToken(users);
            let refreshToken = generateRefreshToken(users);
            employer.accessToken = accessToken
            employer.refreshToken = refreshToken
            employer.role = role
            return res.status(200).json({status:200,message:`Login success`,data:employer})
          }
        
        } catch (error) {
          return res.status(404).json({ status: 404, message: error.message, data:error.data });
        }
},
};

module.exports = UsersController;
