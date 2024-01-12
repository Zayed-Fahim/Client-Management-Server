const CompletedTask = require("../models/CompletedTask");

exports.postCompletedTaskService = async (data) => {
  const result = await CompletedTask.create(data);
  return result;
};
exports.getCompletedTaskService = async () => {
  const result = await CompletedTask.find({});
  return result;
};

exports.getCompletedTaskByIDService = async (query) => {
  try {
    const task = await CompletedTask.findOne({
      $and: [{ assigned_for: query.assigned_for }, { task_id: query.task_id }],
    });
    if (!task) {
      return null;
    }
    return task;
  } catch (error) {
    console.error("No Completed task found:", error.message);
    throw error;
  }
};

exports.updateCompletedTaskService = async (query, data) => {
  try {
    if (!data || !data.attachments || data.attachments.length === 0) {
      return null;
    }
    const updatedTask = await CompletedTask.findOneAndUpdate(
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
    return updatedTask.attachments.length;
  } catch (error) {
    console.error("Error updating Completed task:", error.message);
    throw error;
  }
};
