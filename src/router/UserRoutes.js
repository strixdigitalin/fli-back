const express = require("express");
const { createUser, login } = require("../controller/AuthControler");
const { getAllUser } = require("../controller/UserControler");
const router = express.Router();
router.get("/get", getAllUser);
// router.post("/login", login);

const WalletRouter = router;
module.exports = WalletRouter;
