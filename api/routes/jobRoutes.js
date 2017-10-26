"use strict";

const jobController = require("../controllers/jobController");
const express = require("express");
const router = express.Router();

const MW = require("./middlewares");

router.route("/").
    get(MW.validateToken, MW.validateUserId, jobController.GetJobs).
    post(MW.validateToken, MW.validateUserId, jobController.CreateJob);

router.route("/:app_id").
    get(MW.validateToken, jobController.SingleJob).
    delete(MW.validateToken, jobController.DeleteJob);

module.exports = router;