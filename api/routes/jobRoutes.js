'use strict';

const jobController = require('../controllers/jobController');
const express = require('express');
const router = express.Router();

const MW = require('./middlewares');

//This route only for development test
router.route('/listjobs').get(jobController.listJobs);

router.route('/').
  get(MW.validateToken, MW.validateUserId, jobController.getJobs).
  post(MW.validateToken, MW.validateUserId, jobController.createJob);

router.route('/:app_id').
  get(MW.validateToken, MW.validateUserId, MW.validateOwnerShip,
    jobController.singleJob).
  delete(MW.validateToken, MW.validateUserId, MW.validateOwnerShip,
    jobController.deleteJob).
  put(MW.validateToken, MW.validateUserId, MW.validateOwnerShip,
    jobController.updateJob);

module.exports = router;