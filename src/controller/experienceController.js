const {
  getUserExperience,
  getExperienceById,
  insertExperience,
  updateExperience,
  deleteExperience,
} = require("../model/experienceModel");

const ExperienceController = {
  getMyExperience: async (req, res) => {
    let id = req.payload.id;
    let response = await getUserExperience(id);
    // console.log(response);
    if (response.rows.length === 0) {
      return res.status(400).json({ msg: "Failed to get experience" });
    }
    return res
      .status(200)
      .json({ msg: "Success get my experience", data: response.rows });
  },
  getUserExperience: async (req, res) => {
    let id = req.params.id;
    let response = await getUserExperience(id);
    // console.log(response);
    if (response.rows.length === 0) {
      return res.status(400).json({ msg: `Failed to get experience, exp user ${id} doesn't exist` });
    }
    return res
      .status(200)
      .json({ msg: `Success get user ${id} experience`, data: response.rows });
  },
  getExperienceById: async (req, res) => {
    let id = req.params.id;
    let response = await getExperienceById(id);
    // console.log(response);
    if (response.rows.length === 0) {
      return res.status(400).json({ msg: "Failed to get experience" });
    }
    return res
      .status(200)
      .json({ msg: "Success get experience", data: response.rows });
  },

  insertExperience: async (req, res) => {
    try {
      // console.log(imageUrl);
      let id = req.payload.id;
      const data = {
        id,
        company_name: req.body.company_name,
        experience_description: req.body.experience_description,
        work_start_date: req.body.work_start_date,
        work_end_date: req.body.work_end_date,
        position: req.body.position,
      };
      let response = await insertExperience(data);
      if (response.rows.length === 0) {
        return res.status(401).json({ msg: "Failed to insert experience" });
      }
      return res.status(201).json({ msg: "Insert Experience successful" });
    } catch (error) {
      return res
        .status(404)
        .json({ msg: error.message, data: error.data });
    }
  },
  updateExperience: async (req, res) => {
    try {
      let id = req.params.id;
      let {
        rows: [exp],
      } = await getExperienceById(id);
      let data = {
        company_name: req.body.company_name || exp.company_name,
        experience_description:
          req.body.experience_description || exp.experience_description,
        work_start_date: req.body.work_start_date || exp.work_start_date,
        work_end_date: req.body.work_end_date || exp.work_end_date,
        position: req.body.position || exp.position,
      };
      console.log(data);
      let response = await updateExperience(data, id);
      if (response.rows.length === 0) {
        return res.status(401).json({ msg: "Update experience failed" });
      }
      return res.status(201).json({ msg: "Update experience successful" });
    } catch (error) {
      return res
        .status(error.status)
        .json({ msg: error.message, data: error.data });
    }
  },

  deleteExperience: async (req, res) => {
    try {
      let id = req.params.id;
      let users_id = req.payload.id;
      let {
        rows: [exp],
      } = await getExperienceById(id);

      if (exp.users_id !== users_id) {
        return res.status(200).json({ msg: "You dont own this experience" });
      }

      let response = await deleteExperience(id);
      if (response.rows.length === 0) {
        return res.status(400).json({ msg: "Delete experience failed" });
      }
      return res.status(200).json({ msg: "Delete experience successful" });
    } catch (error) {
      return res
        .status(error.status)
        .json({ msg: error.message, data: error.data });
    }
  },
};

module.exports = ExperienceController;
