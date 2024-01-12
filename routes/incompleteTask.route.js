const express = require("express");
const {
  postIncompleteTask,
  getIncompleteTask,
  updateIncompleteTask,
  getIncompleteTaskByID,
} = require("../controllers/IncompleteTask.controller");
const router = express.Router();

router
  .route("/:assigned_for/:task_id")
  .patch(updateIncompleteTask)
  .get(getIncompleteTaskByID);
router.route("/").post(postIncompleteTask).get(getIncompleteTask);

module.exports = router;
