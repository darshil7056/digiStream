// src/models/userModel.js
const connection = require('../config/database');
const bcrypt = require('bcrypt');

const userModel = {

  getWeb3UserByWalletAddress: (walletaddress, callback) => {
    const query = `SELECT * FROM web3users WHERE walletaddress = ?`;
    connection.query(query, [walletaddress], (err, results) => {
      if (err) return callback(err);

      if (results.length === 0) {
        return callback(null, null); // User not found, return null
      }

      callback(null, results[0]);
    });
  },

  updateSubscriberStatus: (walletaddress, newSubscriberStatus, callback) => {
    const query = `UPDATE web3users SET subscriber = ? WHERE walletaddress = ?`;
    connection.query(query, [newSubscriberStatus, walletaddress], callback);
  },
  
  isUserExpired: (walletaddress, callback) => {
    const query = `SELECT expiryTime FROM web3users WHERE walletaddress = ?`;
    connection.query(query, [walletaddress], (err, results) => {
      if (err) return callback(err);

      if (results.length === 0) {
        // User not found, return response with isExpired as false
        return callback(null, false);
      }

      const expiryTime = new Date(results[0].expiryTime);
      const currentTime = new Date();
      
      // Set the time portion of currentTime to midnight
      currentTime.setHours(0, 0, 0, 0);

      const isExpired = currentTime > expiryTime;
      callback(null, isExpired);
    });
  },


  createWeb3User: (walletaddress, subscriber, subscriptionTime, expiryTime, callback) => {
    const query = `INSERT INTO web3users (walletaddress, subscriber, subscriptionTime, expiryTime) VALUES (?, ?, ?, ?)`;
    connection.query(query, [walletaddress, subscriber, subscriptionTime, expiryTime], callback);
  },

  findByEmail: (email, callback) => {
    const query = `SELECT * FROM users WHERE email = '${email}'`;
    connection.query(query, callback);
  },

  createUser: (email, password, callback) => {
    // Check if a user with the given email already exists
    userModel.findByEmail(email, (err, results) => {
      if (err) return callback(err);

      // if (results.length > 0) {
      //   return callback(new Error('User with this email already exists'));
      // }

      bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) return callback(err);

        const query = `INSERT INTO users (email, password) VALUES ('${email}', '${hashedPassword}')`;
        connection.query(query, callback);
      });
    });
  },
};

module.exports = userModel;
