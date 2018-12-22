const express = require("express");
const User = require("../models/user");
const router = express.Router();

router.get("/user/:email", async (req, res) => {
  const email = req.params.email;
  const result = User.findOne({ email: email });
  res.send(result);
});
router.put("/user", (req, res) => {
  res.send("ok put");
});

module.exports = router;
