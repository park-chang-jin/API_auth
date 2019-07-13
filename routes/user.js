const express = require('express');
const router = require('express-promise-router')();
const {validateBody, scheams} = require('../helper/routerhelpers');

const userController = require('../controller/user');

// @route POST /user/signup
// @desc Create user / 기존 = router.post('/login', (req, res) => {})
// @access Public
router.route('/signup').post(validateBody(scheams.signupSchema), userController.signup);

// @route POST /user/login
// @desc user login
// @access Public
router.route('/login').post(validateBody(scheams.loginSchema),userController.login);

// @route POST /user/secret
// @desc sectet
// @access Public
router.route('/secret').get(userController.secret);

module.exports = router;