const mongoose = require("mongoose");

const Joi = require("joi");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    lowercase: true,
    required: true
  },
  fullName: {
    type: String
  },
  street: {
    type: String
  },
  city: {
    type: String
  },
  zip: {
    type: String
  },
  country: {
    type: String
  },
  birthday: {
    type: Date
  }
});
function validateUser(user) {
  const schema = {
    email: Joi.string().required(),
    password: Joi.string().required(),
    role: Joi.string().required()
  };
  return Joi.validate(user, schema);
}

const User = mongoose.model("User", userSchema);

module.exports = User;
