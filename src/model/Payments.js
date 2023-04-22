const mongoose = require("mongoose");
const Notification = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },

    stripeId: { type: String },
    detail: {},
    status: {
      type: String,
      enum: ["SUCCESS", "PENDING", "FAIL"],
      default: "PENDING",
    },
  },
  { timestamps: true }
);

module.exports = new mongoose.model("payments", Notification);
