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
    console.log("gpa", user.gpa);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const scholarship = await Scholarship.findById(scholarshipId);
    console.log("gpaReq", scholarship.gpaReq);
    if (!scholarship) {
      return res.status(404).json({ error: "Scholarship not found" });
    }

    const existingScholarship = user.scholarships.find(
      (scholarshipObj) =>
        scholarshipObj.scholarship.toString() === scholarshipId
    );

    const maxApplications = 3; // Set the maximum number of allowed applications
    if (user.scholarships.length >= maxApplications) {
      return res.status(403).json({
        error: `You have reached the maximum number of scholarship applications (${maxApplications}).`,
      });
    }

    if (existingScholarship) {
      return res.status(409).json({ error: "Scholarship already applied" });
    }

    if (user.gpa <= "0") {
      return res.status(403).json({ error: "Update your gpa to proceed" });
    }

    if (user.gpa < scholarship.gpaReq) {
      return res.status(409).json({
        error: `Sorry, unfortunatly you dont qualify for this scholarship, your gpa must be above ${scholarship.gpaReq} `,
      });
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

// Update gpa

router.post("/updateGpa/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const { gpa } = req.body;

    const user = await User.findById(userId);

    // Find the user by userId
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update the user's GPA
    user.gpa = gpa;
    await user.save();

    // Respond with the updated user
    res.json({ message: "User's GPA updated successfully", user });
  } catch (error) {
    res.status(500).json({ error: "Failed updating gpa" });
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
