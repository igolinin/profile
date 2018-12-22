const express = require("express");
const User = require("../models/user");
const router = express.Router();

router.get("/user/:email", async (req, res) => {
  const email = req.params.email;
  const result = User.findOne({ email: email });
  res.send(result);
});
router.get("/", async (req, res) => {
  const users = User.find();
  res.send(users);
});
router.put("/user", (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("User does not exist");

  const user = req.body;
  await User.findByIdAndUpdate({ email: user.email }, { $set: user });

  res.send("ok put");
});

module.exports = router;
