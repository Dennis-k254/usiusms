const express = require("express");
const router = express.Router();
const { User } = require("../models/user");

router.post("/reset-password/:token", async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  // Find the user with the given reset token
  const user = await User.findOne({
    resetToken: token,
    resetTokenExpiration: { $gt: Date.now() },
  });

  if (!user) {
    return res.status(404).send("Invalid or expired reset token.");
  }

  // Update the user's password
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(password, salt);
  user.resetToken = undefined;
  user.resetTokenExpiration = undefined;

  await user.save();

  res.send("Password reset successful.");
});
