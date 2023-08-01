// const express = require('express');
// const mysql = require('mysql');
// const bcrypt = require('bcrypt');
// const cors = require('cors');
// const app = express();
// // Enable CORS
// app.use(cors());
// const port = 3000;
// app.use(express.json());
// // Database connection
// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root', 
//   password: '', 
//   database: 'digistream', // Name of your database
// });


// connection.connect((err) => {
//   if (err) throw err;
//   console.log('Connected to the database');
// });

// app.get('/', (req, res) => {
//   res.send('Hello, World!');
// });

// // API endpoints
// app.get('/api/login', (req, res) => {
//   const { email, password } = req.query;

//   const query = `SELECT * FROM users WHERE email = '${email}'`;

//   connection.query(query, (err, results) => {
//     if (err) throw err;

//     if (results.length === 1) {
//       const user = results[0];
//       bcrypt.compare(password, user.password, (err, result) => {
//         if (err) throw err;

//         if (result) {
//           res.json({ success: true, message: 'Login successful',email:email });
//         } else {
//           res.json({ success: false, message: 'Invalid username or password' });
//         }
//       });
//     } else {
//       res.json({ success: false, message: 'Invalid username or password' });
//     }
//   });
// });

// app.post('/api/register', (req, res) => {
//   const { email, password } = req.body;

//   bcrypt.hash(password, 10, (err, hashedPassword) => {
//     if (err) throw err;

//     const query = `INSERT INTO users (email, password) VALUES ('${email}', '${hashedPassword}')`;

//     connection.query(query, (err, results) => {
//       if (err) throw err;

//       res.json({ success: true, message: 'Registration successful' });
//     });
//   });
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
