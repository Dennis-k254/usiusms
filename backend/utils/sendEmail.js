const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, html) => {
  try {
    // Step 1: Create a transporter
    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Step 2: Define email options
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to,
      subject,
      html,
    };

    // Step 3: Send the email
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("An error occurred while sending the email.");
  }
};

module.exports = sendEmail;
