const dbPool = require("../../models/db");
const bcrypt = require("bcryptjs");
const randomize = require("randomatic");
const sendEmail = require("../../utils/email");

require("dotenv").config();

exports.registerStudent = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const [existingStudent] = await dbPool.execute(
      "SELECT email FROM users WHERE email = ?",
      [email]
    );
    if (existingStudent.length > 0) {
      res.status(400).json({
        status: false,
        message: "email already exists",
      });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const verificationToken = randomize("A0a0", 40);
      const verification_status = false;
      const query = `INSERT INTO users (email,  name, password, email_verified, verification_token) VALUES (?,?,?,?,?)`;
      const [results] = await dbPool.execute(query, [
        email,
        name,
        hashedPassword,
        verification_status,
        verificationToken,
      ]);

      if (!results) {
        res.status(400).json({
          status: false,
          message: "something went wrong",
        });
      }
      sendEmail.sendEmail(email, verificationToken);

      res.status(200).json({
        status: true,
        message: "successful",
      });
    }
  } catch (error) {
    console.error(error);
  }
};
