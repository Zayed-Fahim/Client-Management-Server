const DoingTask = require("../models/DoingTask");
const {
  postDoingTaskService,
  getDoingTaskService,
  getDoingTaskByIDService,
  updateDoingTaskService,
} = require("../services/doingTask.service");

exports.postDoingTask = async (req, res, next) => {
  try {
    const { task_id } = req.body;
    const alreadyExists = await DoingTask.exists({ task_id });
    if (alreadyExists) {
      return res
        .status(509)
        .json({ status: "Conflict", message: "Task already exists" });
    }
    const result = await postDoingTaskService(req.body);
    res.status(200).json({ status: "Success", message: "Post successfully" });
  } catch (error) {
    console.error(error.message);
    res
      .status(500)
      .json({ status: "Failed", message: "Internal Server Error" });
    next(error);
  }
};

exports.getDoingTask = async (req, res, next) => {
  try {
    const result = await getDoingTaskService();
    res.status(200).json({
      status: "Success",
      message: "Here are all Doing Task Data",
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

exports.getDoingTaskByID = async (req, res, next) => {
  try {
    const { assigned_for, task_id } = req.params;
    const query = { assigned_for, task_id };
    const taskExists = await DoingTask.exists({
      $and: [{ assigned_for: assigned_for }, { task_id: task_id }],
    });
    if (!taskExists) {
      return res.status(404).json({ status: "Failed", message: "Not Found" });
    }
    const result = await getDoingTaskByIDService(query);
    if (result === null) {
      return res
        .status(304)
        .json({ status: "Failed", message: "No Doing task found" });
    }
    res.status(200).json({
      status: "Success",
      message: "Found the Doing task",
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

exports.updateDoingTask = async (req, res, next) => {
  try {
    const { assigned_for, task_id } = req.params;
    const query = { assigned_for, task_id };
    const taskExists = await DoingTask.exists({
      $and: [{ assigned_for: assigned_for }, { task_id: task_id }],
    });
    if (!taskExists) {
      return res.status(404).json({ status: Failed, message: "Not Found" });
    }
    const result = await updateDoingTaskService(query, req.body);
    if (result === null) {
      return res
        .status(304)
        .json({ status: "Failed", message: "Attachments not updated" });
    }
    res.status(200).json({ status: "Success", message: "SuccessFull Updated" });
  } catch (error) {
    console.error(error.message);
    res
      .status(500)
      .json({ status: "Failed", message: "Internal Server Error" });
    next(error);
  }
};
