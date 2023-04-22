const express = require("express");
const { createBooking } = require("../controller/BookingControler");
const {
  cancelOrder,
  getORder,
  orderChangeRequest,
} = require("../controller/OrderControler");

const {
  createIntent,
  confirmPaymentIntent,
} = require("../controller/PaymentControler");
const router = express.Router();

// const multer = require("multer");

const { verifyVendorRole } = require("../middleware/auth");
const upload = require("../middleware/Multer");
const {
  createPAyment,
  getPayments,
  CreateCheckoutSession,
} = require("../controller/StripeControler");

//  stripe------
router.post("/create", upload.none(), createPAyment);
router.get("/get", getPayments);
router.post("/create-checkout-session", CreateCheckoutSession);

// ------------- duffel
router.post("/intent", createIntent);
router.post("/confirm/:id", confirmPaymentIntent);
const WalletRouter = router;
module.exports = WalletRouter;
