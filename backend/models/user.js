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
  scholarships: [
    {
      universityName: { type: String },
      status: { type: String },
      scholarshipName: { type: String },
      applicationDeadline: { type: Date },
    },
  ],
});

const User = mongoose.model("User", userSchema);

exports.User = User;
