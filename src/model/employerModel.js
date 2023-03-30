const Pool = require("./../config/dbconfig");
const getAllEmployer = (data) => {
  let { searchBy, search, sortBy, sort, limit, offset } = data;
  let qry = `SELECT users.id, users.name, users.email, users.phone, employer.company_name as company_name, employer.company_photo as photo, employer.company_field as field, employer.company_info as info, employer.province_name as province, employer.city_name as city, employer.company_email as company_email
    FROM users
    JOIN employer ON users.id = employer.users_id
    WHERE users.role = 'employer' AND users.${searchBy} ILIKE '%${search}%' ORDER BY ${sortBy} ${sort} 
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

const getDetailEmployer = (data) => {
  let { id } = data;
  let qry = `SELECT users.id, users.name, users.email, users.phone, employer.company_name as company_name, employer.company_photo as photo, employer.company_field as field, employer.company_info as info, employer.province_name as province, employer.city_name as city, employer.company_email as company_email 
    FROM users
    JOIN employer ON users.id = employer.users_id
    WHERE users.role = 'employer' AND users.id = '${id}' `;
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

const getEmployer = (data) => {
  let { id } = data;
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
};

//TODO
const updateEmployer = (id, data) => {
  let {
    company_email,
    company_name,
    company_photo,
    company_field,
    company_info,
    province_name,
    city_name,
    position,
  } = data;
  let qry = `UPDATE employer SET 
  company_email='${company_email}',
  company_name='${company_name}',
  company_photo='${company_photo}',
  company_field='${company_field}',
  company_info='${company_info}',
  province_name='${province_name}',
  city_name='${city_name}',position='${position}'  where users_id = '${id}'`;
  console.log("Query = ");
  console.log(qry);
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
  getAllEmployer,
  getDetailEmployer,
  getEmployer,
  updateEmployer,
};
