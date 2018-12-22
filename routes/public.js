const express = require("express");
const User = require("../models/user");
const router = express.Router();

router.get("/user/:email", async (req, res) => {
  res.send("ok get");
});
router.put("/user", (req, res) => {
  res.send("ok put");
});

module.exports = router;
