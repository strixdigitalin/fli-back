const express = require("express");
const { createUser, login } = require("../controller/AuthControler");
const router = express.Router();
router.post("/create", createUser);
router.post("/login", login);

const WalletRouter = router;
module.exports = WalletRouter;
