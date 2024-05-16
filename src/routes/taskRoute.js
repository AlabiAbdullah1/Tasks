const { Router } = require("express");
const createTaskController = require("../controller/tasks/createTask");
const getTaskController = require("../controller/tasks/getTasks");
const getATaskController = require("../controller/tasks/getaTask");
const updateTaskController = require("../controller/tasks/updateTask");
const deleteTaskController = require("../controller/tasks/deleteTask");
const validator = require("../middleware/validation.middleware");
const { createTaskValidation } = require("../validations/task.validation");

const taskRoute = Router();

taskRoute.get("/:id", getATaskController.getTask);

taskRoute.get("/", getTaskController.getTask);

taskRoute.post(
  "/",
  validator.validateSchema(createTaskValidation),

  createTaskController.createTask
);

taskRoute.patch("/:id", updateTaskController.updateTask);
taskRoute.delete("/:id", deleteTaskController.deleteTask);

module.exports = taskRoute;
