const Pool = require("./../config/dbconfig");

const createUser = (data) => {
  const { id, name, email, password, phone, role, otp } = data;
  const query = `INSERT INTO users(id, name, email, password,phone, role, otp,created_at) 
    VALUES('${id}','${name}', '${email}','${password}','${phone}','${role}','${otp}', NOW()::timestamp)`;
  return new Promise((resolve, reject) =>
    Pool.query(query, (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(err);
      }
    })
  );
};
const findUser = (email) => {
  let qry = `SELECT * FROM users WHERE email='${email}'`;
  return new Promise((resolve, reject) =>
    Pool.query(qry, (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(err);
      }
    })
  );
};

const findUserById = (id) => {
  let qry = `SELECT * FROM users WHERE id='${id}'`;
  return new Promise((resolve, reject) =>
    Pool.query(qry, (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(err);
      }
    })
  );
};

const selectDataUserById = (id) => {
  let qry = `SELECT * 
  FROM users WHERE id='${id}'`;
  return new Promise((resolve, reject) =>
    Pool.query(qry, (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(err);
      }
    })
  );
};

const createEmployer = (company_data) => {
  const { id, company_name, position } = company_data;
  const qry = `INSERT INTO employer(users_id,company_name,position) VALUES ('${id}','${company_name}', '${position}')`;
  return new Promise((resolve, reject) =>
    Pool.query(qry, (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(err);
      }
    })
  );
};

const createEmployee = (data) => {
  const { id } = data;
  const qry = `INSERT INTO employee(users_id) VALUES ('${id}')`;
  return new Promise((resolve, reject) =>
    Pool.query(qry, (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(err);
      }
    })
  );
};

const verifyUser = (id) => {
  let qry = `UPDATE users SET verified = true WHERE id='${id}'`;
  return new Promise((resolve, reject) =>
    Pool.query(qry, (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(err);
      }
    })
  );
};

const updateUser = (id, data_users) =>{
  const {name, email, phone} = data_users
  let qry = `UPDATE users SET name='${name}', email='${email}',phone='${phone}' WHERE id='${id}'`;
  return new Promise((resolve, reject) =>
    Pool.query(qry, (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(err);
      }
    })
  );
}

const changePassword = (data) =>{
  const {email, password} = data
  let qry = `UPDATE users SET password = '${password}' WHERE email='${email}'`;
  return new Promise((resolve, reject) =>
    Pool.query(qry, (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(err);
      }
    })
  );
}

const checkOTP = (data) =>{
  const {email, otp} = data
  let qry = `SELECT * FROM users WHERE email='${email}' AND otp = '${otp}'`;
  return new Promise((resolve, reject) =>
    Pool.query(qry, (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(err);
      }
    })
  );
}

module.exports = {
  createUser,
  findUser,
  findUserById,
  selectDataUserById,
  verifyUser,
  createEmployer,
  createEmployee,
  updateUser,
  changePassword,
  checkOTP
};
