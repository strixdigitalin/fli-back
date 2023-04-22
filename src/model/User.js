const mongoose = require("mongoose");
const validateEmail = function (email) {
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return regex.test(email);
};
const User = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    mobile: Number,
    gender: String,
    dob: Date,
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: "Email address is required",
      validate: [validateEmail, "Please fill a valid email address"],
    },
    password: {
      type: String,
      trim: true,
      required: "Password is required",
    },
    bookings: [],
  },
  { timestamps: true }
);

module.exports = new mongoose.model("user", User);
