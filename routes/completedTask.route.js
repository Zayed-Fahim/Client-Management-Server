const express = require("express");
const {
  updateCompletedTask,
  getCompletedTaskByID,
  postCompletedTask,
  getCompletedTask,
} = require("../controllers/completedTask.controller");
const router = express.Router();

router
  .route("/:assigned_for/:task_id")
  .patch(updateCompletedTask)
  .get(getCompletedTaskByID);
router.route("/").post(postCompletedTask).get(getCompletedTask);

module.exports = router;
