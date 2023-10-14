const { Router } = require("express");
const usersController = require("./user.controller");
const { userValidatorMiddleware } = require("./user.validators");
const { authMiddleware } = require("../auth/auth.middleware");

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

module.exports = {
  usersRouter,
};
