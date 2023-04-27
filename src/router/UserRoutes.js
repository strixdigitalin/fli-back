const express = require("express");
const { createUser, login } = require("../controller/AuthControler");
const {
  getAllUser,
  sendEmailconfirmation,
  cretaeUser,
} = require("../controller/UserControler");
const router = express.Router();
router.get("/get", getAllUser);
router.post("/mail", sendEmailconfirmation);
router.post("/create", cretaeUser);

const WalletRouter = router;
module.exports = WalletRouter;
