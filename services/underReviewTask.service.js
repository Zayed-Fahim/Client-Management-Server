const UnderReviewTask = require("../models/UnderReview");

exports.postUnderReviewTaskService = async (data) => {
  const result = await UnderReviewTask.create(data);
  return result;
};
exports.getUnderReviewTaskService = async () => {
  const result = await UnderReviewTask.find({});
  return result;
};

exports.getUnderReviewTaskByIDService = async (query) => {
  try {
    const task = await UnderReviewTask.findOne({
      $and: [{ assigned_for: query.assigned_for }, { task_id: query.task_id }],
    });
    if (!task) {
      return null;
    }
    return task;
  } catch (error) {
    console.error("No UnderReview task found:", error.message);
    throw error;
  }
};

exports.updateUnderReviewTaskService = async (query, data) => {
  try {
    if (!data || !data.attachments || data.attachments.length === 0) {
      return null;
    }
    const updatedTask = await UnderReviewTask.findOneAndUpdate(
      {
        $and: [
          { assigned_for: query.assigned_for },
          { task_id: query.task_id },
        ],
      },
      { $push: { attachments: { $each: data?.attachments } } },
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updatedTask) {
      return null;
    }
    return updatedTask;
  } catch (error) {
    console.error("Error updating UnderReview task:", error.message);
    throw error;
  }
};
