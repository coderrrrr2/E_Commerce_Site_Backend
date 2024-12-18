const express = require('express');

const authController = require('../controllers/auth');

const router = express.Router();

router.get('/login', authController.getLogin);

router.post('/login', authController.postLogin);

router.post('/signup', authController.postSignUp);

router.post('/logout', authController.logout);

router.get('/signup', authController.getSignUp);



module.exports = router;