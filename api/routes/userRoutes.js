'use strict';

const userController = require('../controllers/userController');
const express = require('express');
const router = express.Router();

router.route('/auth/signup').post(userController.signUp);

router.route('/auth/login').post(userController.login);

router.route('/auth/logout').post(userController.logout);

router.route('/').get(userController.listUsers);

router.route('/:user_id').get(userController.singleUser);
// 	.delete(userController.Deleteuser)

module.exports = router;