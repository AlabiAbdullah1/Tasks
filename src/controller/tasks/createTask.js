const dbPool = require("../../models/db");
const logger = require("../../logger/logger");

module.exports.createTask = async (req, res) => {
  try {
    const { description, completed } = req.body;
    const query = `INSERT INTO tasks(description, isCompleted) VALUES(?,?)`;
    const [results] = await dbPool.execute(query, [description, completed]);
    if (!results) {
      res.status(400).json({
        message: "An error has occured!",
      });
    }
    return res.status(201).json({
      message: "Task created Successfully!",
    });
  } catch (error) {
    logger.error("Server Error has occured", error.message);
    res.status(500).json({
      message: error.message,
    });
  }
};
