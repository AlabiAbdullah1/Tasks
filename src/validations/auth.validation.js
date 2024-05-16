const joi = require("joi");

exports.authValidation = joi.object({
  name: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().required().alphanum(),
});

exports.loginValidation = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required().alphanum(),
});

exports.forgetPasswordValidation = joi.object({
  email: joi.string().email().required(),
});
