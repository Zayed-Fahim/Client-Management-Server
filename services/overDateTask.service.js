const OverDateTask = require("../models/OverDateTask");

exports.postOverDateTaskService = async (data) => {
  const result = await OverDateTask.create(data);
  return result;
};
exports.getOverDateTaskService = async () => {
  const result = await OverDateTask.find({});
  return result;
};

exports.getOverDateTaskByIDService = async (query) => {
  try {
    const task = await OverDateTask.findOne({
      $and: [{ assigned_for: query.assigned_for }, { task_id: query.task_id }],
    });
    if (!task) {
      return null;
    }
    return task;
  } catch (error) {
    console.error("No OverDate task found:", error.message);
    throw error;
  }
};

exports.updateOverDateTaskService = async (query, data) => {
  try {
    if (!data || !data.attachments || data.attachments.length === 0) {
      return null;
    }
    const updatedTask = await OverDateTask.findOneAndUpdate(
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
    console.error("Error updating OverDate task:", error.message);
    throw error;
  }
};
