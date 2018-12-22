const express = require("express");
const User = require("../models/user");
const router = express.Router();
const auth = require("../middleware/auth");

router.get("/user", auth, async (req, res) => {
  const email = req.user.email;
  const result = await User.findOne({ email: email });
  res.send(result);
});
router.get("/", async (req, res) => {
  const users = await User.find({});
  res.send("ok");
});
router.put("/user", auth, async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("User does not exist");

  await User.findByIdAndUpdate({ email: user.email }, { $set: req.body });

  res.send("ok put");
});

module.exports = router;
