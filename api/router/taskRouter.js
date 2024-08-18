const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
// const Task = require("../model/taskModel");
const isUser = require("../midleware/isUser");
const Task = require("../model/taskModel");

// create new Task

router.post("/add-task", isUser, async (req, res) => {
  const { title, description } = req.body;
  const userReferId = req.user._id;
  try {
    const isTask = await Task.findOne({
      $and: [{ title }, { userReferId }],
    });
    if (isTask) {
      return res.status(404).json({ message: "Task already exist" });
    }
    const task = new Task({
      id: new mongoose.Types.ObjectId(),
      title: title,
      description: description,
      important: req.body.important,
      userReferId,
    });
    await task.save();
    res.status(200).json({
      message: "Task created successfully",
      data: task,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// get all tasks for user

router.get("/get-task", isUser, async (req, res) => {
  try {
    const userReferId = req.user._id;

    const allTask = await Task.find({ userReferId });
    res.status(200).json({
      message: "All tasks fetched successfully",
      data: allTask,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// delete task for user

router.delete("/delete-task/:id", isUser, async (req, res) => {
  try {
    const taskId = req.params.id;
    const deleteTask = await Task.deleteOne({ _id: taskId });
    res.status(200).json({
      message: "Task deleted successfully",
      data: deleteTask,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// ------------------

router.get("/get-important-task", isUser, async (req, res) => {
  try {
    const userReferId = req.user._id;

    const allTask = await Task.find({ userReferId });

    const importantTasks = allTask.filter((task) => task.important);
    res.status(200).json({
      message: "All tasks fetched successfully",
      data: importantTasks,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// update task for user

router.put("/update-task/:id", async (req, res) => {
  try {
    const taskId = req.params.id;
    const { title, description, completed } = req.body;

    const updateTask = await Task.findByIdAndUpdate(taskId, {
      title,
      description,
      completed,
    });

    res.status(200).json({
      message: "Task updated successfully" + "ggg" + completed,
      data: updateTask,
      ggg: completed,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
