const express = require("express");
const { createBooking } = require("../controller/BookingControler");
const router = express.Router();

// const multer = require("multer");

const { verifyVendorRole } = require("../middleware/auth");
const upload = require("../middleware/Multer");

router.post("/create", upload.none(), createBooking);

const WalletRouter = router;
module.exports = WalletRouter;
