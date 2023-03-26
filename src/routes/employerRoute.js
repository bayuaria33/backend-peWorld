const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const { upload } = require("../middleware/upload");
const {
  getAllEmployer,
  getProfileEmployer,
  getDetailEmployer,
  updateEmployer,
} = require("../controller/employerController");

router.get("/all", getAllEmployer);
router.get("/my-profile", protect, getProfileEmployer);
router.get("/:id", getDetailEmployer);
router.put(
  "/update-profile",
  protect,
  upload.single("company_photo"),
  updateEmployer
);
module.exports = router;
