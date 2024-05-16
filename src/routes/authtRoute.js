const { Router } = require("express");
const verifyController = require("../controller/auth/verify");
const registerController = require("../controller/auth/Register");
const signinController = require("../controller/auth/signin");
const validator = require("../middleware/validation.middleware");
const forgetPasswordController = require("../controller/auth/forgetPassword");
const resetPasswordController = require("../controller/auth/resetPassword");
const {
  authValidation,
  forgetPasswordValidation,
} = require("../validations/auth.validation");
const { loginValidation } = require("../validations/auth.validation");

const authRoute = Router();

authRoute.post(
  "/signup",
  validator.validateSchema(authValidation),
  registerController.registerStudent
);
authRoute.post(
  "/login",
  validator.validateSchema(loginValidation),
  signinController.signinStudent
);

authRoute.post("/verify/:token", verifyController.verifyuser_post);

authRoute.post(
  "/forgetPassword/:id",
  validator.validateSchema(forgetPasswordValidation),
  forgetPasswordController.forgetPassword
);

authRoute.post(
  "/resetPassword/:id/:token/:email",
  resetPasswordController.resetPassword
);

module.exports = authRoute;
