const Pool = require("./../config/dbconfig");
const getAllEmployee = (data) => {
    let { searchBy, search, sortBy, sort, limit, offset } = data;
    let qry = `SELECT users.id, users.name, users.email, users.phone, employee.employee_photo as photo, employee.employee_job as job, employee.employee_description as description, employee.province_name as province, employee.city_name as city, employee.github as github, employee.linkedin as linkedin, employee.instagram as instagram
    FROM users
    JOIN employee ON users.id = employee.users_id
    WHERE users.role = 'employee' AND users.${searchBy} ILIKE '%${search}%' ORDER BY ${sortBy} ${sort} 
    LIMIT ${limit} OFFSET ${offset}`;
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
  
  const getDetailEmployee = (data) =>{
    let {id} = data;
    let qry = `SELECT users.id, users.name, users.email, users.phone, employee.employee_photo as photo, employee.employee_job as job, employee.employee_description as description, employee.province_name as province, employee.city_name as city, employee.github as github, employee.linkedin as linkedin, employee.instagram as instagram, skill.skills
    FROM users
    JOIN employee ON users.id = employee.users_id
    JOIN skill ON users.id = skill.users_id
    WHERE users.role = 'employee' AND users.id = '${id}' `;
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

  const getEmployee = (data) =>{
    let {id} = data;
    let qry = `SELECT * from employee where users_id = '${id}'`;
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

  const getEmployer = (data) =>{
    let {id} = data;
    let qry = `SELECT * from employer where users_id = '${id}'`;
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

const updateEmployee = (id, data) =>{
  let {employee_photo, employee_job, employee_description, province_name, city_name, github, linkedin, instagram} = data;
  let qry = `UPDATE employee SET 
  employee_photo='${employee_photo}',
  employee_job='${employee_job}',
  employee_description='${employee_description}',
  province_name='${province_name}',
  city_name='${city_name}',
  github='${github}',
  linkedin='${linkedin}',
  instagram='${instagram}' where users_id = '${id}'`;
  console.log(qry)
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
getAllEmployee,
getDetailEmployee,
getEmployee,
getEmployer,
updateEmployee
}