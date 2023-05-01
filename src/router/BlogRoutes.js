const express = require("express");
const router = express.Router();

const upload = require("../middleware/Multer");
const e = require("express");
const {
  PostBlog,
  getAllBlog,
  deleteBlogs,
} = require("../controller/BlogControler");
router.post(
  "/create",
  upload.fields([{ name: "image", maxCount: 1 }]),
  PostBlog
);
router.get("/get", getAllBlog);
router.delete("/delete/:id", deleteBlogs);

const WalletRouter = router;
module.exports = WalletRouter;
