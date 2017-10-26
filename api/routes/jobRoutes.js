"use strict";

const jobController = require("../controllers/jobController");
const express = require("express");
const router = express.Router();

const MW = require("./middlewares");

//This route only for development test
router.route("/listjobs").get(jobController.ListJobs);

router.route("/").
    get(MW.validateToken, MW.validateUserId, jobController.GetJobs).
    post(MW.validateToken, MW.validateUserId, jobController.CreateJob);

router.route("/:app_id").
    get(MW.validateToken, MW.validateUserId, MW.validateOwnerShip,
        jobController.SingleJob).
    delete(MW.validateToken, MW.validateUserId, MW.validateOwnerShip,
        jobController.DeleteJob);

module.exports = router;