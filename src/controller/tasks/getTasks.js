const dbPool = require("../../models/db");
const logger = require("../../logger/logger");

module.exports.getTask = async (req, res) => {
  try {
    const query = `SELECT * FROM tasks`;
    const [results] = await dbPool.execute(query);
    if (!results) {
      res.status(404).json({
        message: "An error has occured!",
      });
    }
    return res.status(201).json({
      message: results,
    });
  } catch (error) {
    logger.error("Server Error has occured", error.message);
    res.status(500).json({
      message: error.message,
    });
  }
};
