// Database Functions

const TaskSchema = require("../models/todo");

module.exports.addNewTask = (obj, callback) => {
  obj.save(callback);
};

module.exports.getTaskByTaskName = (name, callback) => {
  TaskSchema.findOne({ name: name }, callback);
};

module.exports.getAllTasks = (callback) => {
  TaskSchema.find({}, callback);
};

module.exports.markTaskAsCompleted = (id, callback) => {
  TaskSchema.updateOne({ _id: id }, { $set: { completed: true } }, callback);
};

module.exports.deleteTask = (name, callback) => {
  TaskSchema.deleteOne({ name: name }, callback);
};
