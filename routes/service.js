const express = require("express");

const User = require("../models/user");
const router = express.Router();

router.post("/newuser", async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already exist");

  const newuser = new User({
    email: req.body.email,
    fullName: req.body.fullName,
    street: req.body.street,
    city: req.body.city,
    zip: req.body.zip,
    contry: req.bodyzip,
    birthday: req.body.birthday
  });
  const result = await newuser.save();

  res.status(200).send("ok post");
});

router.delete("/", async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("User does not exist");
  await User.deleteOne({ email: req.body.email });

  res.send(`User ${req.body.email} succesfully removed`);
});

module.exports = router;
