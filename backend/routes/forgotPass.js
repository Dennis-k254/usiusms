const express = require("express");
const router = express.Router();
const { User } = require("../models/user");

// Function to generate a random reset token
const generateResetToken = () => {
  // Generate a random string or token here
  // Example implementation using a library like crypto-random-string:
  const cryptoRandomString = require("crypto-random-string");
  const token = cryptoRandomString({ length: 20, type: "alphanumeric" });
  return token;
};

router.post("/reset-password", async (req, res) => {
  const { email } = req.body;

  // Find the user in the database
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).send("User not found.");
  }

  // Generate and set the reset token for the user
  const resetToken = generateResetToken();
  user.resetToken = resetToken;
  user.resetTokenExpiration = Date.now() + 3600000; // 1 hour from now

  await user.save();

  // Send the reset token to the user's email
  sendResetEmail(user.email, resetToken);

  res.send("Password reset email sent.");
});

module.exports = router;
