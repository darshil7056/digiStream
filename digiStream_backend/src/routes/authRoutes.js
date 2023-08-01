// src/routes/authRoutes.js
const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/check-expiry/:walletaddress', authController.checkExpiry);

// PUT API to update subscriber status
router.get('/check-subscriber/:walletaddress', authController.checkSubscriber);
router.put('/update-subscriber/:walletaddress', authController.updateSubscriber);
router.post('/web3users', authController.createWeb3User);   
router.get('/login', authController.login);
router.post('/register', authController.register);

module.exports = router;
