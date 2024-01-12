const IncompleteTask = require("../models/IncompleteTask");

exports.postIncompleteTaskService = async (data) => {
  const result = await IncompleteTask.create(data);
  return result;
};
exports.getIncompleteTaskService = async () => {
  const result = await IncompleteTask.find({});
  return result;
};

exports.getIncompleteTaskByIDService = async (query) => {
  try {
    const task = await IncompleteTask.findOne({
      $and: [{ assigned_for: query.assigned_for }, { task_id: query.task_id }],
    });
    if (!task) {
      return null;
    }
    return task;
  } catch (error) {
    console.error("No incomplete task found:", error.message);
    throw error;
  }
};

exports.updateIncompleteTaskService = async (query, data) => {
  try {
    if (!data || !data.attachments || data.attachments.length === 0) {
      return null;
    }
    const updatedTask = await IncompleteTask.findOneAndUpdate(
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
    console.error("Error updating incomplete task:", error.message);
    throw error;
  }
};
