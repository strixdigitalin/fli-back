const express = require("express");
const { createBooking } = require("../controller/BookingControler");
const {
  cancelOrder,
  getORder,
  orderChangeRequest,
  getServices,
  getAllORders,
} = require("../controller/OrderControler");
const router = express.Router();

// const multer = require("multer");

const { verifyVendorRole } = require("../middleware/auth");
const upload = require("../middleware/Multer");

router.post("/cancel/:ORDER_ID", upload.none(), cancelOrder);
router.get("/get/:id", getORder);
router.post("/change", upload.none(), orderChangeRequest);
router.get("/service/:orderId", upload.none(), getServices);
router.post("/create", createBooking);
router.get("/order", getAllORders);

const WalletRouter = router;
module.exports = WalletRouter;
