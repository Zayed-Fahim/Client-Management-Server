const express = require("express");
const {
  updateToDoTask,
  getToDoTaskByID,
  postToDoTask,
  getToDoTask,
} = require("../controllers/toDoTask.controller");

const router = express.Router();

router
  .route("/:assigned_for/:task_id")
  .patch(updateToDoTask)
  .get(getToDoTaskByID);
router.route("/").post(postToDoTask).get(getToDoTask);

module.exports = router;
