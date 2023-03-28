const Pool = require("./../config/dbconfig");

const insertHire = (data) =>{
    const {id, employer_id, employee_id,hire_description,position} = data
    let qry = `INSERT INTO hire (id, employer_id, employee_id, hire_description, position, created_at)
    VALUES ('${id}','${employer_id}','${employee_id}', '${hire_description}', '${position}', NOW()::timestamp)`;
    // console.log(qry);
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


const insertMessage = (data) =>{
  const {sender_id, receiver_id,hire_id,chat} = data
  let qry = `INSERT INTO message (sender_id, receiver_id, hire_id, chat, created_at)
  VALUES ('${sender_id}','${receiver_id}', '${hire_id}', '${chat}', NOW()::timestamp)`;
  // console.log(qry);
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

const getHirebyEmployer = (employer_id) =>{
  let qry = `SELECT hire.id, hire.hire_description, hire.position, hire.employee_id, hire.employer_id, 
  employee.name AS Employee_name,
  employer.name AS Employer_name
  FROM hire
  JOIN users AS employee ON hire.employee_id = employee.id
  JOIN users AS employer ON hire.employer_id = employer.id
  WHERE employer_id = '${employer_id}';`;
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

const getHirebyEmployee = (employee_id) =>{
  let qry = `SELECT hire.id, hire.hire_description, hire.position, hire.employee_id, hire.employer_id, 
  employee.name AS Employee_name,
  employer.name AS Employer_name
  FROM hire
  JOIN users AS employee ON hire.employee_id = employee.id
  JOIN users AS employer ON hire.employer_id = employer.id
  WHERE employee_id = '${employee_id}';`;
  // console.log(qry);
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

const getMessageByHire = (hire_id) =>{
  let qry = `SELECT message.chat, message.hire_id, message.receiver_id, message.sender_id, 
  sender.name AS sender_name,
  receiver.name AS receiver_name,
  hire.position AS hire_position,
  hire.hire_description AS hire_description
  FROM message
  JOIN users AS sender ON message.sender_id = sender.id
  JOIN users AS receiver ON message.receiver_id = receiver.id
  JOIN hire AS hire ON message.hire_id = hire.id
  WHERE hire_id = '${hire_id}' ORDER BY message.created_at ASC`;
  // console.log(qry);
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


//(get all chat room) select all chat where hire_id = hire_id
//(get individual chats) select all hire where employer = employer

module.exports = {
    insertHire,
    insertMessage,
    getHirebyEmployer,
    getHirebyEmployee,
    getMessageByHire
}