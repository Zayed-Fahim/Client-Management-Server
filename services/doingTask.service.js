const DoingTask = require("../models/DoingTask");

exports.postDoingTaskService = async (data) => {
  const result = await DoingTask.create(data);
  return result;
};
exports.getDoingTaskService = async () => {
  const result = await DoingTask.find({});
  return result;
};

exports.getDoingTaskByIDService = async (query) => {
  try {
    const task = await DoingTask.findOne({
      $and: [{ assigned_for: query.assigned_for }, { task_id: query.task_id }],
    });
    if (!task) {
      return null;
    }
    return task;
  } catch (error) {
    console.error("No Doing task found:", error.message);
    throw error;
  }
};

exports.updateDoingTaskService = async (query, data) => {
  try {
    if (!data || !data.attachments || data.attachments.length === 0) {
      return null;
    }
    const updatedTask = await DoingTask.findOneAndUpdate(
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
    console.error("Error updating Doing task:", error.message);
    throw error;
  }
};
