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

module.exports = {
  createUser,
  findUser,
  selectDataUserById,
  verifyUser,
  createEmployer,
  createEmployee,
};
