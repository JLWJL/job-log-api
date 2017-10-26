"use strict";

const jobController = require("../controllers/jobController");
const express = require("express");
const router = express.Router();

const MW = require("./middlewares");

router.route("/").
    get(MW.checkTokenStatus, MW.checkUserStatus, jobController.GetJobs).
    post(MW.checkTokenStatus, jobController.CreateJob);

router.route("/:app_id").
    get(MW.checkTokenStatus, jobController.SingleJob).
    delete(MW.checkTokenStatus, jobController.DeleteJob);

module.exports = router;