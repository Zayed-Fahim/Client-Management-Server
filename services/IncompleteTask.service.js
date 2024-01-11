const IncompleteTask = require("../models/IncompleteTask");

exports.postIncompleteTaskService = async (data) => {
  const result = await IncompleteTask.create(data);
  return result;
};
exports.getIncompleteTaskService = async () => {
  const result = await IncompleteTask.find({});
  return result;
};
