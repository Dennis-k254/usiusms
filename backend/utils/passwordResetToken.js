const jwt = require("jsonwebtoken");

const generatePasswordResetToken = async (user) => {
  try {
    const secretKey = process.env.JWT_SECRET_KEY;
    const expirationTime = "1h";

    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
      },
      secretKey,
      { expiresIn: expirationTime }
    );

    user.resetToken = token;
    user.resetTokenExpiration = Date.now() + 3600000; // Token expiration time: 1 hour

    await user.save();

    return token;
  } catch (err) {
    console.error("Error generating password reset token:", err);
    throw err;
  }
};

module.exports = generatePasswordResetToken;
