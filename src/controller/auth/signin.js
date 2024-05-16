const dbPool = require("../../models/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.signinStudent = async (req, res) => {
  try {
    const { email, password } = req.body;
    const [existingStudent] = await dbPool.execute(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );
    if (existingStudent.length > 0) {
      if (existingStudent[0].email_verified === 0) {
        return res
          .status(400)
          .json({ status: false, message: "Kindly verify your email" });
      }
      const hashedPassword = existingStudent[0].password;
      const isPassword = await bcrypt.compare(password, hashedPassword);

      if (!isPassword) {
        return res
          .status(400)
          .json({ status: false, message: "Invalid Email/Password" });
      }
      const token = jwt.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_LIFETIME,
      });

      res.status(200).json({
        status: true,
        message: "Successfully logged in",
        token,
      });
    } else {
      res.status(400).json({
        status: false,
        message: "Sorry. We could not find your account",
      });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ status: false, message: "Error. Internal Server Error" });
  }
};
