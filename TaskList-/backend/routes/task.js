var express = require("express");
var taskController = require("../controllers/task.js");
const router = express.Router();

router.post("/createtask/:id", taskController.createTask);
router.get("/gettasks/:id", taskController.getTasks);
router.patch("/updatetask/:id", taskController.updateTask);
router.delete("/deletetask/:id", taskController.deleteTask);

module.exports = router;
