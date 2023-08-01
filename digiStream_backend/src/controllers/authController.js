// src/controllers/authController.js
const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');

const authController = {

  checkSubscriber: (req, res) => {
    const { walletaddress } = req.params;

    userModel.getWeb3UserByWalletAddress(walletaddress, (err, user) => {
      if (err) {
        console.error(err.message);
        return res.status(500).json({ success: false, message: 'Internal server error' });
      }

      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }

      res.json({ success: true, subscriber: user.subscriber });
    });
  },
  updateSubscriber: (req, res) => {
    const { walletaddress } = req.params;
    const { subscriber } = req.body;

    userModel.updateSubscriberStatus(walletaddress, subscriber, (err, result) => {
      if (err) {
        console.error(err.message);
        return res.status(500).json({ success: false, message: 'Internal server error' });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }

      res.json({ success: true, message: 'Subscriber status updated successfully' });
    });
  },

  checkExpiry: (req, res) => {
    const { walletaddress } = req.params;

    userModel.isUserExpired(walletaddress, (err, isExpired) => {
      if (err) {
        console.error(err.message);
        return res.status(500).json({ success: false, message: 'Internal server error' });
      }

      if (isExpired) {
        return res.json({ success: true, message: 'User is expired' });
      } else {
        return res.json({ success: true, message: 'User is not expired' });
      }
    });
  },

  createWeb3User: (req, res) => {
    const { walletaddress, subscriber } = req.body;
    const subscriptionTime = new Date(); // Current timestamp
    const expiryTime = new Date();
    expiryTime.setMonth(expiryTime.getMonth() + 3); // Adding 3 months to the current date

    userModel.createWeb3User(walletaddress, subscriber, subscriptionTime, expiryTime, (err) => {
      if (err) throw err;

      res.json({ success: true, message: 'Web3 user created successfully' });
    });
  },
  login: (req, res) => {
    const { email, password } = req.query;

    userModel.findByEmail(email, (err, results) => {
      if (err) throw err;

      if (results.length === 1) {
        const user = results[0];
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) throw err;

          if (result) {
            res.json({ success: true, message: 'Login successful', email: email });
          } else {
            res.json({ success: false, message: 'Invalid username or password' });
          }
        });
      } else {
        res.json({ success: false, message: 'Invalid username or password' });
      }
    });
  },

  register: (req, res) => {
    const { email, password } = req.body;

    userModel.findByEmail(email, (err, results) => {
      if (err) throw err;

      if (results.length > 0) {
        res.json({ success: false, message: 'User already exists' });
      } else {
        userModel.createUser(email, password, (err) => {
          if (err) throw err;

          res.json({ success: true, message: 'Registration successful' });
        });
      }
    });
  },
};

module.exports = authController;
