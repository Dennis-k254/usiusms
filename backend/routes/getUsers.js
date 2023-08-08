const express = require("express");
const router = express.Router();
const { User } = require("../models/user");

// Route to retrieve all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find({}, "-password"); // Exclude the password from the response
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users." });
  }
});

// Route to update the isAdmin status for a user
router.patch("/:userId/toggleAdmin", async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // Toggle the isAdmin status
    user.isAdmin = !user.isAdmin;
    await user.save();

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to update isAdmin status." });
  }
});

router.delete("/:userId/delete", async (req, res) => {
  try {
    const { userId } = req.params;

    let user = await User.findByIdAndDelete(userId);

    if (!user) return res.status(404).send("user not found");

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
