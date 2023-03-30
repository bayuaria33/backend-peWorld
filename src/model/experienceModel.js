const Pool = require("./../config/dbconfig");

const getUserExperience = (id) => {
    let qry = `SELECT * from experience WHERE users_id = '${id}' AND deleted_at IS NULL`;
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

  const getExperienceById = (id) => {
    let qry = `SELECT * from experience WHERE id = '${id}' AND deleted_at IS NULL`;
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

const updateExperience = (data,id) =>{
    const {company_name, experience_description, position, work_start_date, work_end_date} = data
    let qry = `UPDATE experience SET company_name='${company_name}', experience_description='${experience_description}',position='${position}',work_start_date='${work_start_date}',work_end_date='${work_end_date}' WHERE id = '${id}'`;
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

const insertExperience = (data) =>{
    const {id, company_name, experience_description, position, work_start_date, work_end_date} = data
    let qry = `INSERT INTO experience (users_id, company_name, experience_description, position, work_start_date, work_end_date, created_at)
    VALUES ('${id}','${company_name}', '${experience_description}', '${position}', '${work_start_date}', '${work_end_date}', NOW()::timestamp)`;
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

const deleteExperience = (id) =>{
    let qry = `UPDATE experience SET deleted_at = NOW()::timestamp WHERE id = '${id}'`;
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
    getUserExperience,
    getExperienceById,
    updateExperience,
    insertExperience,
    deleteExperience
}