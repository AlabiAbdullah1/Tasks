const dbPool = require("../../models/db");
exports.verifyuser_post = async (req, res) => {
  try {
    const verification_token = req.params.token;

    const [user] = await dbPool.execute(
      "SELECT * FROM users WHERE verification_token = ? LIMIT 1",
      [verification_token]
    );

    if (user.length > 0) {
      const userId = user[0].id;
      await dbPool.execute(
        "UPDATE users SET email_verified = true, verification_token = NULL WHERE id = ?",
        [userId]
      );
      res.send("Token Verified Successully!");
    } else {
      res.status(400).json({
        message: "Invalid Verification Token",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};
