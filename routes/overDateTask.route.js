const express = require("express");
const {
  updateOverDateTask,
  getOverDateTaskByID,
  postOverDateTask,
  getOverDateTask,
} = require("../controllers/overDateTask.controller");
const router = express.Router();

router
  .route("/:assigned_for/:task_id")
  .patch(updateOverDateTask)
  .get(getOverDateTaskByID);
router.route("/").post(postOverDateTask).get(getOverDateTask);

module.exports = router;
