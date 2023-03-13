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

router.get("/create", upload.none(), getOffers);
router.post("/search", upload.none(), searchFlights);
router.get("/fetch", upload.none(), fetchOFfers);
router.get("/fetch-by-id", upload.none(), getOfferById);
router.get("/seatmap/:id", upload.none(), getSeatMap);
router.get("/airports", upload.none(), getAirPorts);

const WalletRouter = router;
module.exports = WalletRouter;
