const { Scholarship } = require("../models/scholarship");
const express = require("express");
const router = express.Router();
const { User } = require("../models/user");


// API route to add a scholarship to the user's scholarships array
router.post("/:userId", async (req, res) => {
  try {
    const { scholarshipId, status, applicationDeadline, userId, category } =
      req.body;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const scholarship = await Scholarship.findById(scholarshipId);
    if (!scholarship) {
      return res.status(404).json({ error: "Scholarship not found" });
    }

    // Add the scholarship to the user's scholarships array
    user.scholarships.push({
      scholarship: scholarshipId,
      status,
      applicationDeadline,
      category,
    });

    await user.save();
    res.status(200).json({ message: "Scholarship added to user" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// API route to get the user's scholarships array

router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).populate(
      "scholarships.scholarship"
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const scholarships = user.scholarships;
    res.status(200).json({ scholarships });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
