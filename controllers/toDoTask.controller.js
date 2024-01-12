const ToDoTask = require("../models/ToDoTask");
const {
  postToDoTaskService,
  getToDoTaskService,
  getToDoTaskByIDService,
  updateToDoTaskService,
} = require("../services/toDoTask.service");

exports.postToDoTask = async (req, res, next) => {
  try {
    const { task_id } = req.body;
    const alreadyExists = await ToDoTask.exists({ task_id });
    if (alreadyExists) {
      return res
        .status(509)
        .json({ status: "Conflict", message: "Task already exists" });
    }
    const result = await postToDoTaskService(req.body);
    res.status(200).json({ status: "Success", message: "Post successfully" });
  } catch (error) {
    console.error(error.message);
    res
      .status(500)
      .json({ status: "Failed", message: "Internal Server Error" });
    next(error);
  }
};

exports.getToDoTask = async (req, res, next) => {
  try {
    const result = await getToDoTaskService();
    res.status(200).json({
      status: "Success",
      message: "Here are all ToDo Task Data",
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

exports.getToDoTaskByID = async (req, res, next) => {
  try {
    const { assigned_for, task_id } = req.params;
    const query = { assigned_for, task_id };
    const taskExists = await ToDoTask.exists({
      $and: [{ assigned_for: assigned_for }, { task_id: task_id }],
    });
    if (!taskExists) {
      return res.status(404).json({ status: "Failed", message: "Not Found" });
    }
    const result = await getToDoTaskByIDService(query);
    if (result === null) {
      return res
        .status(304)
        .json({ status: "Failed", message: "No ToDo task found" });
    }
    res.status(200).json({
      status: "Success",
      message: "Found the ToDo task",
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

exports.updateToDoTask = async (req, res, next) => {
  try {
    const { assigned_for, task_id } = req.params;
    const query = { assigned_for, task_id };
    const taskExists = await ToDoTask.exists({
      $and: [{ assigned_for: assigned_for }, { task_id: task_id }],
    });
    if (!taskExists) {
      return res.status(404).json({ status: Failed, message: "Not Found" });
    }
    const result = await updateToDoTaskService(query, req.body);
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
