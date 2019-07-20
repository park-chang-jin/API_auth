const express = require('express');
const router = require('express-promise-router')();
const passport = require('passport');
const passportConfig = require('../passport');


const {validateBody, scheams} = require('../helper/routerhelpers');

const userController = require('../controller/user');

const authCheck = passport.authenticate('jwt', { session: false });
const passportSignIn = passport.authenticate('local', { session: false });



// @route POST /user/signup
// @desc Create user / 기존 = router.post('/login', (req, res) => {})
// @access Public
router.route('/signup').post(validateBody(scheams.signupSchema), userController.signup);

// @route POST /user/login
// @desc user login
// @access Public
router.route('/login').post(validateBody(scheams.loginSchema), passportSignIn, userController.login);

router.route('/oauth/google').post(passport.authenticate('googleToken', { session: false }), userController.googleAuth);



// @route POST /user/secret
// @desc sectet
// @access Public
router.route('/secret').get(authCheck, userController.secret);

module.exports = router;