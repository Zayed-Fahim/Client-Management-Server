const OverDateTask = require("../models/OverDateTask");
const {
  postOverDateTaskService,
  getOverDateTaskService,
  getOverDateTaskByIDService,
  updateOverDateTaskService,
} = require("../services/overDateTask.service");

exports.postOverDateTask = async (req, res, next) => {
  try {
    const { task_id } = req.body;
    const alreadyExists = await OverDateTask.exists({ task_id });
    if (alreadyExists) {
      return res
        .status(509)
        .json({ status: "Conflict", message: "Task already exists" });
    }
    const result = await postOverDateTaskService(req.body);
    res.status(200).json({ status: "Success", message: "Post successfully" });
  } catch (error) {
    console.error(error.message);
    res
      .status(500)
      .json({ status: "Failed", message: "Internal Server Error" });
    next(error);
  }
};

exports.getOverDateTask = async (req, res, next) => {
  try {
    const result = await getOverDateTaskService();
    res.status(200).json({
      status: "Success",
      message: "Here are all OverDate Task Data",
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

exports.getOverDateTaskByID = async (req, res, next) => {
  try {
    const { assigned_for, task_id } = req.params;
    const query = { assigned_for, task_id };
    const taskExists = await OverDateTask.exists({
      $and: [{ assigned_for: assigned_for }, { task_id: task_id }],
    });
    if (!taskExists) {
      return res.status(404).json({ status: "Failed", message: "Not Found" });
    }
    const result = await getOverDateTaskByIDService(query);
    if (result === null) {
      return res
        .status(304)
        .json({ status: "Failed", message: "No OverDate task found" });
    }
    res.status(200).json({
      status: "Success",
      message: "Found the OverDate task",
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

exports.updateOverDateTask = async (req, res, next) => {
  try {
    const { assigned_for, task_id } = req.params;
    const query = { assigned_for, task_id };
    const taskExists = await OverDateTask.exists({
      $and: [{ assigned_for: assigned_for }, { task_id: task_id }],
    });
    if (!taskExists) {
      return res.status(404).json({ status: Failed, message: "Not Found" });
    }
    const result = await updateOverDateTaskService(query, req.body);
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
