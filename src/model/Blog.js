const mongoose = require("mongoose");
const Notification = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    shortDescription: {
      type: String,
      required: [true, "short Description is required"],
    },
    image: {
      type: String,
      //   required: [true, "Title is required"],
    },
    detail: {
      type: String,
      required: [true, "Detail is required"],
    },
  },
  { timestamps: true }
);

module.exports = new mongoose.model("blog", Notification);
