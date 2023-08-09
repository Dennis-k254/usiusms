const express = require("express");
const router = express.Router();
const { User } = require("../models/user");
const Joi = require("joi");
const generatePasswordResetToken = require("../utils/passwordResetToken");
const sendEmail = require("../utils/sendEmail");

router.post("/", async (req, res) => {
  // Step 2: Validate the request
  const schema = Joi.object({
    email: Joi.string().min(3).max(200).required().email(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const { email } = req.body;

  try {
    // Step 3: Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send("User not found.");
    }

    // Step 4: Generate a password reset token
    const token = await generatePasswordResetToken(user);

    // Step 5: Send the password reset email
    const resetLink = `http://localhost:5173/reset-password-confirmation?token=${token}`;

    const emailSubject = "Password Reset";
    const emailHtml = `
      <html>
        <body>
          <p>Please click the following link to reset your password:</p>
          <a href="${resetLink}">${resetLink}</a>
        </body>
      </html>
    `;

    await sendEmail(user.email, emailSubject, emailHtml);
    res.send("Password reset email sent to the user's email.");
  } catch (err) {
    console.error("Error resetting password:", err);
    res.status(500).send("An error occurred while resetting the password.");
  }
});

module.exports = router;
