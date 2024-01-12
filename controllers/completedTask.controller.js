const CompletedTask = require("../models/CompletedTask");
const {
  postCompletedTaskService,
  getCompletedTaskService,
  getCompletedTaskByIDService,
  updateCompletedTaskService,
} = require("../services/completedTask.service");

exports.postCompletedTask = async (req, res, next) => {
  try {
    const { task_id } = req.body;
    const alreadyExists = await CompletedTask.exists({ task_id });
    if (alreadyExists) {
      return res
        .status(509)
        .json({ status: "Conflict", message: "Task already exists" });
    }
    const result = await postCompletedTaskService(req.body);
    res.status(200).json({ status: "Success", message: "Post successfully" });
  } catch (error) {
    console.error(error.message);
    res
      .status(500)
      .json({ status: "Failed", message: "Internal Server Error" });
    next(error);
  }
};

exports.getCompletedTask = async (req, res, next) => {
  try {
    const result = await getCompletedTaskService();
    res.status(200).json({
      status: "Success",
      message: "Here are all Completed Task Data",
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

exports.getCompletedTaskByID = async (req, res, next) => {
  try {
    const { assigned_for, task_id } = req.params;
    const query = { assigned_for, task_id };
    const taskExists = await CompletedTask.exists({
      $and: [{ assigned_for: assigned_for }, { task_id: task_id }],
    });
    if (!taskExists) {
      return res.status(404).json({ status: "Failed", message: "Not Found" });
    }
    const result = await getCompletedTaskByIDService(query);
    if (result === null) {
      return res.status(304).json({
        status: "Failed",
        message: "No Completed Task found",
      });
    }
    res.status(200).json({
      status: "Success",
      message: "Found the Completed Task",
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

exports.updateCompletedTask = async (req, res, next) => {
  try {
    const { assigned_for, task_id } = req.params;
    const query = { assigned_for, task_id };
    const taskExists = await CompletedTask.exists({
      $and: [{ assigned_for: assigned_for }, { task_id: task_id }],
    });
    if (!taskExists) {
      return res.status(404).json({ status: Failed, message: "Not Found" });
    }
    const result = await updateCompletedTaskService(query, req.body);
    if (result === null) {
      return res
        .status(304)
        .json({ status: "Failed", message: "Attachments not updated" });
    }
    res
      .status(200)
      .json({
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
