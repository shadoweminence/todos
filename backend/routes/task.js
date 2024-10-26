const express = require("express");
const Task = require("../models/Task");
const router = express.Router();

//get all lists
router.get("/fetch", async (req, res) => {
  try {
    const list = await Task.find();
    res.json(list);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("internal server error");
  }
});

//Save a todo message
router.post("/save", async (req, res) => {
  const { title, description } = req.body;
  const task = new Task({ title, description });
  await task.save();
  res.status(201).send(task);
});

//update a task
router.put("/update/:id", async (req, res) => {
  const { title, description } = req.body;
  try {
    const newTask = {};
    if (title) {
      newTask.title = title;
    }
    if (description) {
      newTask.description = description;
    }

    let task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(400).send("Not found");
    }

    task = await Task.findByIdAndUpdate(
      req.params.id,
      { $set: newTask },
      { new: true }
    );
    res.json({ task });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server errror");
  }
});

//delete a task
router.delete("/delete/:id", async (req, res) => {
  const { title, description } = req.body;
  try {
    let task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(400).send("Not found");
    }

    task = await Task.findByIdAndDelete(req.params.id);
    res.json({ success: "The task has been deleted" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server errror");
  }
});

module.exports = router;
