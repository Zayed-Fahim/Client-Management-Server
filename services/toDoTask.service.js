const ToDoTask = require("../models/ToDoTask");

exports.postToDoTaskService = async (data) => {
  const result = await ToDoTask.create(data);
  return result;
};
exports.getToDoTaskService = async () => {
  const result = await ToDoTask.find({});
  return result;
};

exports.getToDoTaskByIDService = async (query) => {
  try {
    const task = await ToDoTask.findOne({
      $and: [{ assigned_for: query.assigned_for }, { task_id: query.task_id }],
    });
    if (!task) {
      return null;
    }
    return task;
  } catch (error) {
    console.error("No ToDo task found:", error.message);
    throw error;
  }
};

exports.updateToDoTaskService = async (query, data) => {
  try {
    if (!data || !data.attachments || data.attachments.length === 0) {
      return null;
    }
    const updatedTask = await ToDoTask.findOneAndUpdate(
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
    console.error("Error updating ToDo task:", error.message);
    throw error;
  }
};
