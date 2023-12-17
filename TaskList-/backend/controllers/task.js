var User = require("../models/user.js");
var Task = require("../models/task.js");

exports.createTask = async (req, res) => {
  try {
    const id = req.params.id;
    const task = req.body;

    const findUser = await User.findById(id);

    if (findUser) {
      Task.create(task);

      return res.status(200).json({
        message: "Task created successfully",
      });
    }

    return res.status(400).json({
      message: "Access Denied",
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getTasks = async (req, res) => {
  try {
    const id = req.params.id;

    const findUser = await User.findById(id);

    if (findUser) {
      const tasks = await Task.find({ userId: id }).sort({ createdAt: -1 });

      return res.status(200).json({
        message: "Fetched successfully",
        tasks,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.updateTask = async (req, res) => {
  try {
    const task = req.body;
    const { id } = req.params;
    const updatedTask = await Task.updateOne({ _id: id }, task);

    res.status(200).json({
      message: "Task updated Successfully",
    });
  } catch (error) {}
};

exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedtask = await Task.deleteOne({ _id: id });

    res.status(200).json({
      message: "Task deleted successfully",
    });
  } catch (error) {
    console.log(error);
  }
};
