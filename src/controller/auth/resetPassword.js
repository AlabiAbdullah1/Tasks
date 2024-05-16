const bcrypt = require("bcryptjs");
const dbPool = require("../../models/db");
const randomize = require("randomatic");

exports.resetPassword = async (req, res) => {
  try {
    // const tokenn = randomize("A0a0", 40);
    const { token, email } = req.params;
    const { password } = req.body;

    // check if the token exists in database
    const [user] = await dbPool.execute(
      "SELECT * FROM users WHERE reset_token = ?, email = ? LIMIT 1",
      [token],
      [email]
    );

    if (user.length < 1) {
      res.status(400).json({
        message: "Invalid Reset Token",
      });
    } else {
      const newPassword = await bcrypt.hash(password, 10);
      user[0].password = newPassword;
      user[0].reset_token = null;

      res.status(200).json({
        message: "Pasword Reset successful!",
      });
    }
  } catch (error) {
    console.error(error);
  }
};
