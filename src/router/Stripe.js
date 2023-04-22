const express = require("express");
const router = express.Router();

const { verifyVendorRole } = require("../middleware/auth");
const {
  getOffers,
  getOfferByDestination,
  searchFlights,
  fetchOFfers,
  getOfferById,
  getSeatMap,
  getAirPorts,
} = require("../controller/OfferControler");
const upload = require("../middleware/Multer");



const WalletRouter = router;
module.exports = WalletRouter;
