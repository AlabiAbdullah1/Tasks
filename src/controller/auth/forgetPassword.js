const randomize = require("randomatic");
const nodeMailer = require("nodemailer");
const dbPool = require("../../models/db");

exports.forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const id = req.params.id;

    //check if email exists in student table
    const [existingEmail] = await dbPool.execute(
      "SELECT email FROM users WHERE email = ?",
      [email]
    );

    //create random resetToken and save to database
    const resetToken = randomize("A0a0", 40);

    if (existingEmail.length < 1) {
      res.status(400).json({
        message: "email doesn't exist",
      });
    } else {
      const query = `UPDATE users SET reset_token=? WHERE id=?`;
      const [results] = await dbPool.execute(query, [resetToken, id]);
    }
    const transporter = nodeMailer.createTransport({
      service: "gmail",
      host: "smpt.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "sikeabdulnig@gmail.com",
        pass: "fdyvlpfxuplojszd",
      },
    });
    const sendEmail = async (recipientEmail, resetToken) => {
      const resetLink = `http://localhost:3005/resetPassword/${id}/${resetToken}/${email}`;

      try {
        const info = await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: recipientEmail,
          subject: "Password Reset",
          text: `Click on this link to reset your password: ${resetLink}`,
          html: `<p>Click on this link to reset your password: <a href="${resetLink}">Reset Link</a></p>`,
        });
        console.log(`Message sent: ${info.messageId}`);
      } catch (error) {
        console.error(error);
      }
    };
    sendEmail(email, resetToken);

    res.status(200).json({
      status: "success",
      message: "reset link sent successfully",
    });
  } catch (error) {
    console.error(error);
  }
};
