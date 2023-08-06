const mongoose = require("mongoose");

// DB schema
const scholarshipSchema = new mongoose.Schema({
  scholarshipName: { type: String, required: true },
  category: { type: String, required: true },
  applicationDeadline: { type: Date, required: false },
  gpaReq: { type: String, required: false },
});

const Scholarship = mongoose.model("Scholarship", scholarshipSchema);

exports.Scholarship = Scholarship;
