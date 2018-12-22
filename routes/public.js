const express = require("express");
const User = require("../models/user");
const router = express.Router();
const auth = require("../middleware/auth");

router.get("/user", auth, async (req, res) => {
  const email = req.user.email;
  const result = User.findOne({ email: email });
  res.send(result);
});
router.get("/", async (req, res) => {
  const users = User.find();
  res.send(users);
});
router.put("/user", auth, async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("User does not exist");

  user = req.body;
  await User.findByIdAndUpdate({ email: user.email }, { $set: user });

  res.send("ok put");
});

module.exports = router;
