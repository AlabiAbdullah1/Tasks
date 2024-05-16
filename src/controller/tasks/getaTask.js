const dbPool = require("../../models/db");
const logger = require("../../logger/logger");

module.exports.getTask = async (req, res) => {
  try {
    const id = req.params.id;
    const query = `SELECT * FROM tasks WHERE id=?`;
    const [results] = await dbPool.execute(query, [id]);
    if (!results) {
      res.status(404).json({
        message: "An error has occured!",
      });
    }
    return res.status(200).json({
      message: results,
    });
  } catch (error) {
    logger.error("Server Error has occured", error.message);
    res.status(500).json({
      message: error.message,
    });
  }
};
