const express = require("express");
const {
  updateDoingTask,
  getDoingTaskByID,
  postDoingTask,
  getDoingTask,
} = require("../controllers/doingTask.controller");

const router = express.Router();

router
  .route("/:assigned_for/:task_id")
  .patch(updateDoingTask)
  .get(getDoingTaskByID);
router.route("/").post(postDoingTask).get(getDoingTask);

module.exports = router;
