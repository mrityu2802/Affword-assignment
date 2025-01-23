import mongoose from "mongoose";
import Task from "../models/task.model.js";

export const createTask = async (req, res) => {
  const { task, description, status } = req.body;
  try {
    if (!task || !status) {
      return res.status(400).json({
        message: "Please provide all the required fields",
      });
    }
    const newTask = new Task({
      task,
      description,
      status,
      email: req.user.email,
      googleId: req.user.googleId,
    });
    await newTask.save();
    const tasks = await Task.find({ googleId: req.user.googleId });

    res.status(201).json({ message: "Task added successfully", tasks });
  } catch (error) {
    console.log("Error in creatTask controller", error.message);
    res.status(500).json({ message: error.message });
  }
};

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ googleId: req.user.googleId });
    res.status(201).json({ message: "Task fetched successfully", tasks });
  } catch (error) {
    console.log("Error in getTasks controller", error.message);
    res.status(500).json({ message: error.message });
  }
};

export const getTaskByID = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Task ID" });
    }

    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({
      message: "Task retrieved successfully",
      task,
    });
  } catch (error) {
    console.log("Error in getTask controller", error.message);
    res.status(500).json({ message: error.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    const tasks = await Task.find({ googleId: req.user.googleId });

    res.status(200).json({
      message: "Task deleted successfully",
      tasks,
    });
  } catch (error) {
    console.log("Error in deleteTasks controller", error.message);
    res.status(500).json({ message: error.message });
  }
};

export const deleteMultipleTasks = async (req, res) => {
  const { ids } = req.body;
  console.log(ids);
  try {
    if (!Array.isArray(ids) || ids.length === 0) {
      return res
        .status(400)
        .json({ message: "Invalid request: Provide an array of task IDs" });
    }

    const invalidIds = ids.filter((id) => !mongoose.Types.ObjectId.isValid(id));
    if (invalidIds.length > 0) {
      return res
        .status(400)
        .json({ message: `Invalid Task ID(s): ${invalidIds.join(", ")}` });
    }

    const result = await Task.deleteMany({
      _id: { $in: ids },
      googleId: req.user.googleId,
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "No tasks found to delete" });
    }

    const tasks = await Task.find({ googleId: req.user.googleId });
    res.status(200).json({
      message: `${result.deletedCount} task(s) deleted successfully`,
      deletedIds: ids,
      tasks,
    });
  } catch (error) {
    console.error("Error deleting tasks:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
