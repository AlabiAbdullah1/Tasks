const dbPool = require("../../models/db");
const logger = require("../../logger/logger");

module.exports.updateTask = async (req, res) => {
  try {
    const { description, completed } = req.body;
    const id = req.params.id;
    const query =
      "UPDATE tasks SET description = ?, isCompleted = ? WHERE id = ?";
    const [results] = await dbPool.execute(query, [description, completed, id]);
    if (!results) {
      res.status(404).json({
        message: "An error has occured!",
      });
    }
    return res.status(201).json({
      message: "Task Updated Successfully!",
    });
  } catch (error) {
    logger.error("Server Error has occured", error.message);
    res.status(500).json({
      message: error.message,
    });
  }
};
