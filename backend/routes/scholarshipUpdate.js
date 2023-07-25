const { Scholarship } = require("../models/scholarship");
const express = require("express");
const router = express.Router();
const Joi = require("joi");

// API route to add scholarship to database by admin

router.post("/", async (req, res) => {
  const { scholarshipName, category, applicationDeadline } = req.body;

  let scholarship = new Scholarship({
    scholarshipName,
    category,
    applicationDeadline,
  });

  try {
    await scholarship.save();
    console.log("Scholarship added to the database");
    res.status(200).send("Scholarship added to the database");
  } catch (err) {
    console.error(err);
    // Handle the error appropriately
    res.status(500).send("Error saving scholarship");
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
