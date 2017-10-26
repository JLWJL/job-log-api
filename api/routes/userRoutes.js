"use strict";

const userController = require("../controllers/userController");
const express = require("express");
const router = express.Router();

router.route("/auth/signup")
  .post(userController.SignUp);

router.route("/auth/login")
  .post(userController.Login);

router.route("/auth/logout")
  .post(userController.Logout);

router.route("/")
  .get(userController.ListUsers);

router.route("/:user_id")
  .get(userController.SingleUser);
// 	.delete(userController.Deleteuser)

module.exports = router;