const IncompleteTask = require("../models/IncompleteTask");
const {
  postIncompleteTaskService,
  getIncompleteTaskService,
} = require("../services/IncompleteTask.service");

exports.postIncompleteTask = async (req, res, next) => {
  try {
    const { task_id } = req.body;
    const alreadyExists = await IncompleteTask.exists({ task_id });
    if (alreadyExists) {
      return res
        .status(509)
        .json({ status: "Conflict", message: "Task already exists" });
    }
    const result = await postIncompleteTaskService(req.body);
    res.status(200).json({ status: "Success", message: "Post successfully" });
  } catch (error) {
    console.error(error.message);
    res
      .status(500)
      .json({ status: "Failed", message: "Internal Server Error" });
    next(error);
  }
};

exports.getIncompleteTask = async (req, res, next) => {
  try {
    const result = await getIncompleteTaskService();
    res.status(200).json({
      status: "Success",
      message: "Here are all Incomplete Task Data",
      payload: result,
    });
  } catch (error) {
    console.error(error.message);
    res
      .status(500)
      .json({ status: "Failed", message: "Internal Server Error" });
    next(error);
  }
};
