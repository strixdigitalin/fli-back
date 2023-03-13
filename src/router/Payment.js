const express = require("express");
const { createBooking } = require("../controller/BookingControler");
const {
  cancelOrder,
  getORder,
  orderChangeRequest,
} = require("../controller/OrderControler");
const { createPAyment } = require("../controller/PaymentControler");
const router = express.Router();

// const multer = require("multer");

const { verifyVendorRole } = require("../middleware/auth");
const upload = require("../middleware/Multer");

router.post("/create", upload.none(), createPAyment);

const WalletRouter = router;
module.exports = WalletRouter;
