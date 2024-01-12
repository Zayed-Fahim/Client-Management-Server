const UnderReviewTask = require("../models/UnderReview");

const {
  postUnderReviewTaskService,
  getUnderReviewTaskService,
  getUnderReviewTaskByIDService,
  updateUnderReviewTaskService,
} = require("../services/underReviewTask.service");

exports.postUnderReviewTask = async (req, res, next) => {
  try {
    const { task_id } = req.body;
    const alreadyExists = await UnderReviewTask.exists({ task_id });
    if (alreadyExists) {
      return res
        .status(509)
        .json({ status: "Conflict", message: "Task already exists" });
    }
    const result = await postUnderReviewTaskService(req.body);
    res.status(200).json({ status: "Success", message: "Post successfully" });
  } catch (error) {
    console.error(error.message);
    res
      .status(500)
      .json({ status: "Failed", message: "Internal Server Error" });
    next(error);
  }
};

exports.getUnderReviewTask = async (req, res, next) => {
  try {
    const result = await getUnderReviewTaskService();
    res.status(200).json({
      status: "Success",
      message: "Here are all UnderReview Task Data",
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

exports.getUnderReviewTaskByID = async (req, res, next) => {
  try {
    const { assigned_for, task_id } = req.params;
    const query = { assigned_for, task_id };
    const taskExists = await UnderReviewTask.exists({
      $and: [{ assigned_for: assigned_for }, { task_id: task_id }],
    });
    if (!taskExists) {
      return res.status(404).json({ status: "Failed", message: "Not Found" });
    }
    const result = await getUnderReviewTaskByIDService(query);
    if (result === null) {
      return res
        .status(304)
        .json({ status: "Failed", message: "No UnderReview task found" });
    }
    res.status(200).json({
      status: "Success",
      message: "Found the UnderReview task",
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

exports.updateUnderReviewTask = async (req, res, next) => {
  try {
    const { assigned_for, task_id } = req.params;
    const query = { assigned_for, task_id };
    const taskExists = await UnderReviewTask.exists({
      $and: [{ assigned_for: assigned_for }, { task_id: task_id }],
    });
    if (!taskExists) {
      return res.status(404).json({ status: Failed, message: "Not Found" });
    }
    const result = await updateUnderReviewTaskService(query, req.body);
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
