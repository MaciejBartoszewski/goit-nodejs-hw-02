const { Router } = require("express");
const usersController = require("./user.controller");
const {
  userValidatorMiddleware,
  emailValidatorMiddleware,
} = require("./user.validators");
const { authMiddleware } = require("../auth/auth.middleware");
const multer = require("multer");
const path = require("path");
const avatarDir = path.dirname(require.main.filename);

const uploadAvatar = multer({
  dest: path.join(avatarDir, "tmp"),
  limits: {
    fieldSize: 1048576,
  },
}).single("avatar");

const usersRouter = Router();

usersRouter.post(
  "/signup",
  userValidatorMiddleware,
  usersController.signupHandler
);
usersRouter.post(
  "/login",
  userValidatorMiddleware,
  usersController.loginHandler
);
usersRouter.post("/logout", authMiddleware, usersController.logoutHandler);
usersRouter.get("/current", authMiddleware, usersController.currentHandler);
usersRouter.patch(
  "/avatars",
  authMiddleware,
  uploadAvatar,
  usersController.avatarHandler
);
usersRouter.get("/verify/:verificationToken", usersController.verifyHandler);
usersRouter.post(
  "/verify",
  emailValidatorMiddleware,
  usersController.resendVerificationHandler
);

module.exports = {
  usersRouter,
};
