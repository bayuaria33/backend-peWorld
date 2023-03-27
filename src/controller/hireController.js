const { v4: uuidv4 } = require("uuid");
const { insertHire, insertMessage, getHirebyEmployer, getMessageByHire, getHirebyEmployee } = require("../model/hireModel");
const HireController = {
  insertHire: async (req, res) => {
    const employer_id = req.payload.id
    const employee_id = req.params.id
    const hire_description = req.body.hire_description;
    const position = req.body.position
    const chat = req.body.chat
    const id = uuidv4()
    const data_hire = {
        id,
        employer_id,
        employee_id,
        hire_description,
        position
    }
    const data_message = {
      hire_id:id,
      sender_id:employer_id,
      receiver_id:employee_id,
      chat
    }
    let response_hire = await insertHire(data_hire);
    let response_message = await insertMessage(data_message)

    if (!(response_hire && response_message)) {
      return res.status(400).json({ msg: "Failed to insert hire" });
    }
    return res
      .status(200)
      .json({ msg: "Insert Hire successful"});
  },

  getHirebyEmployer: async (req, res) => {
    try {   
      let employer_id = req.payload.id;
      let response = await getHirebyEmployer(employer_id)
      // console.log(response);
      if (!response) {
          return res.status(400).json({msg: "Failed getting hire info (employer)"});
      }
      return res.status(200).json({msg: "Success getting hire info (employer)", data: response.rows});
    } catch (error) {
      return res.status(404).json({msg: error.message, data: error.data});
    }
},
  getHirebyEmployee: async (req, res) => {
    try {   
      let employee_id = req.payload.id;
      let response = await getHirebyEmployee(employee_id)
      // console.log(response);
      if (!response) {
          return res.status(400).json({msg: "Failed getting hire info (employee)"});
      }
      return res.status(200).json({msg: "Success getting hire info (employee)", data: response.rows});
    } catch (error) {
      return res.status(404).json({msg: error.message, data: error.data});
    }
  },

  getMessageByHire: async (req, res) => {
    try {   
      let hire_id = req.params.hire_id
      let response = await getMessageByHire(hire_id)
      // console.log(response);
      if (!response) {
          return res.status(400).json({msg: "Failed getting messages"});
      }
      return res.status(200).json({msg: "Success getting messages", data: response.rows});
    } catch (error) {
      return res.status(404).json({msg: error.message, data: error.data});
    }
  },

  insertMessage: async (req, res,next) => {
    try {   
      let sender_id = req.payload.id
      let receiver_id = req.body.receiver_id
      let hire_id = req.params.hire_id
      let chat = req.body.chat
      console.log("sender_id = " , sender_id)
      const data_message = {
        hire_id,
        sender_id,
        receiver_id,
        chat
      }
      let response_message = await insertMessage(data_message)
      if (!response_message) {
          return res.status(400).json({msg: "Failed sending message"});
      }
      return res.status(200).json({msg: "Success sending message", data: chat});
    } catch (error) {
      return next(res.status(404).json({msg: error.message, data: error}));
    }
  },
};

module.exports = HireController;
