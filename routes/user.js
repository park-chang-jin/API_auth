const express = require('express');
const router = require('express-promise-router')();

const userController = require('../controller/user');

// @route POST /user/signup
// @desc Create user
// @access Public
router.route('/signup').post(userController.signup);

// @route POST /user/login
// @desc user login
// @access Public
router.route('/login').post(userController.login);

// @route POST /user/secret
// @desc sectet
// @access Public
router.route('/secret').get(userController.secret);

module.exports = router;