const joi = require("joi");

exports.createTaskValidation = joi.object({
  description: joi.string().required(),
  completed: joi.boolean().required(),
});
