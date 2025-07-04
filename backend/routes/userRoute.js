import express from "express";

import {
  changeUserPassword,
  forgotPassword,
  getUserInfo,
  login,
  register,
  resetPassword,
  updateUserProfile,
} from "../controllers/userController.js";
import AuthToken from "../middleware/AuthToken.js";

const Router = express.Router();

Router.route("/info").get(AuthToken, getUserInfo);

Router.route("/register").post(register);
Router.route("/login").post(login);
Router.route("/forgot-password").post(forgotPassword);
Router.route("/reset-password").post(resetPassword);

Router.route("/updateuser/:id").put(AuthToken, updateUserProfile);
Router.route("/changepassword/:id").put(AuthToken, changeUserPassword);

export default Router;
