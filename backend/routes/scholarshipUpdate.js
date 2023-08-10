const { Scholarship } = require("../models/scholarship");
const express = require("express");
const router = express.Router();
const Joi = require("joi");
const { User } = require("../models/user");

// API route to add scholarship to database by admin

router.post("/", async (req, res) => {
  const { scholarshipName, category, applicationDeadline, gpaReq } = req.body;

  let scholarship = new Scholarship({
    scholarshipName,
    category,
    applicationDeadline,
    gpaReq,
  });

  console.log(scholarship);

  try {
    await scholarship.save();

    res.status(200).send("Scholarship added to the database");
  } catch (err) {
    console.error(err);
    // Handle the error appropriately
    res.status(500).send("Error saving scholarship");
  }
});

router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId).populate(
      "scholarships.scholarship"
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const userGpa = user.gpa;

    const allScholarships = await Scholarship.find();

    // Filter scholarships based on GPA requirement
    const scholarships = allScholarships.filter((scholarship) => {
      // Check if the scholarship's GPA requirement is less than or equal to the user's GPA

      return scholarship.gpaReq <= userGpa;
    });

    res.status(200).json(scholarships);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching scholarships");
  }
});

router.get("/", async (req, res) => {
  try {
    const scholarships = await Scholarship.find();
    res.status(200).json(scholarships);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching scholarships");
  }
});

module.exports = router;
