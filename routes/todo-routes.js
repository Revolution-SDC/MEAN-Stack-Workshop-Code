// Create Task: Post
// Delete Task: Delete
// Mark Task as Completed: Patch
// Get all Tasks: Get
const express = require("express");
const router = express.Router();

const TaskModel = require("../models/todo");
const Task = require("../controllers/todo-controller");

router.get("/", (req, res) => {
  console.log("Todo Get Route");
  Task.getAllTasks((err, tasks) => {
    if (err) throw err;
    res.json({ success: true, msg: "Todo Get Route", tasks: tasks });
  });
});

router.post("/", (req, res) => {
  // Creating a task.
  const obj = new TaskModel({
    name: req.body.task_name,
    completed: false,
    date: new Date(),
  });
  // Database Logic
  Task.getTaskByTaskName(obj.name, (err, task) => {
    if (err) throw err;
    if (task) return res.json({ success: false, msg: "Task already exists." });
    Task.addNewTask(obj, (err, added) => {
      if (err) throw err;
      console.log(added);
      res.json({ success: true, msg: "Task Added." });
    });
  });
});

router.patch("/", (req, res) => {
  console.log("Todo Patch Route");
  let obj = {
    id: req.body._id,
    completed: true,
  };

  Task.markTaskAsCompleted(obj.id, (err, updated) => {
    if (err) throw err;
    console.log(updated);
    res.json({ success: true, msg: "Task Completed." });
  });
});

router.delete("/", (req, res) => {
  console.log("Todo Delete Route");
  const name = req.query.name;

  Task.deleteTask(name, (err, deleted) => {
    if (err) throw err;
    console.log(deleted);
    res.json({ success: true, msg: "Task Deleted" });
  });
});

module.exports = router;
