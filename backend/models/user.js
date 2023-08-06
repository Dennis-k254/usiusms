const mongoose = require("mongoose");

//DB schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 3, maxlength: 30 },
  email: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 30,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 1024,
  },
  isAdmin: { type: Boolean, default: false },
  gpa: { type: String, default: 0.0 }, // Assuming GPA is on a 4.0 scale
  scholarships: [
    {
      scholarship: { type: mongoose.Schema.Types.ObjectId, ref: "Scholarship" },
      status: { type: String },
      applicationDeadline: { type: Date },
      category: { type: String },
      gpaReq: { type: String },
    },
  ],
});

const User = mongoose.model("User", userSchema);

exports.User = User;
