const nodeMailer = require("nodemailer");
require("dotenv").config();

// const transporter = nodeMailer.createTransport({
//   host: process.env.EMAIL_SERVICE_PROVIDER,
//   port: process.env.SERVICE_PORT,
//   secure: true,
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASSWORD,
//   },
// });

const PORT = process.env.PORT;
const transporter = nodeMailer.createTransport({
  service: "gmail",
  host: "smpt.gmail.com",
  port: 465,
  // secure: true,
  auth: {
    user: "sikeabdulnig@gmail.com",
    pass: "fdyvlpfxuplojszd",
  },
});

exports.sendEmail = async (recipientEmail, verificationToken) => {
  const verificationLink = `http://localhost:${PORT}/user/verify/${verificationToken}`;

  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: recipientEmail,
      subject: "Email Verification",
      text: `Click on this link to verify your email: ${verificationLink}`,
      html: `<p>Click on this link to verify your email: <a href="${verificationLink}">Verification Link</a></p>`,
    });
    console.log(`Message sent: ${info.messageId}`);
    console.log(verificationLink);
  } catch (error) {
    console.error(error);
  }
};
