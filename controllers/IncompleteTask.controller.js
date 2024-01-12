const IncompleteTask = require("../models/IncompleteTask");
const {
  postIncompleteTaskService,
  getIncompleteTaskService,
  updateIncompleteTaskService,
  getIncompleteTaskByIDService,
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

exports.getIncompleteTaskByID = async (req, res, next) => {
  try {
    const { assigned_for, task_id } = req.params;
    const query = { assigned_for, task_id };
    const taskExists = await IncompleteTask.exists({
      $and: [{ assigned_for: assigned_for }, { task_id: task_id }],
    });
    if (!taskExists) {
      return res.status(404).json({ status: "Failed", message: "Not Found" });
    }
    const result = await getIncompleteTaskByIDService(query);
    if (result === null) {
      return res
        .status(304)
        .json({ status: "Failed", message: "No inComplete task found" });
    }
    res.status(200).json({
      status: "Success",
      message: "Found the incomplete task",
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

exports.updateIncompleteTask = async (req, res, next) => {
  try {
    const { assigned_for, task_id } = req.params;
    const query = { assigned_for, task_id };
    const taskExists = await IncompleteTask.exists({
      $and: [{ assigned_for: assigned_for }, { task_id: task_id }],
    });
    if (!taskExists) {
      return res.status(404).json({ status: Failed, message: "Not Found" });
    }
    const result = await updateIncompleteTaskService(query, req.body);
    if (result === null) {
      return res
        .status(304)
        .json({ status: "Failed", message: "Attachments not updated" });
    }
    res.status(200).json({
      status: "Success",
      message: "SuccessFull Updated",
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
