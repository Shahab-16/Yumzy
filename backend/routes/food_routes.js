const express = require("express");
const router = express.Router();
const multer = require("multer");

const {
  addFood,
  getAllFood,
  removeFood,
} = require("../controllers/admin_operations.js");

const storage = multer.diskStorage({
  destination: "uploads",

  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

router.post("/add", upload.single("image"), addFood);
router.get("/get", getAllFood);
router.post("/remove", removeFood);

module.exports = router;
