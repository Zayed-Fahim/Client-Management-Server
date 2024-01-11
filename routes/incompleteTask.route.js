const express = require("express");
const {
  postIncompleteTask,
  getIncompleteTask,
} = require("../controllers/IncompleteTask.controller");
const router = express.Router();

router.route("/").post(postIncompleteTask).get(getIncompleteTask);

module.exports = router;
