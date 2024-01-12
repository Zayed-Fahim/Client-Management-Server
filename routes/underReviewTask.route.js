const express = require("express");
const {
  updateUnderReviewTask,
  getUnderReviewTaskByID,
  postUnderReviewTask,
  getUnderReviewTask,
} = require("../controllers/underReviewTask.controller");

const router = express.Router();

router
  .route("/:assigned_for/:task_id")
  .patch(updateUnderReviewTask)
  .get(getUnderReviewTaskByID);
router.route("/").post(postUnderReviewTask).get(getUnderReviewTask);

module.exports = router;
