const express = require('express');
const jwt = require('jsonwebtoken');
// const expressJwt = require('express-jwt');
const app = express();
require("dotenv").config()
// const secret = 'your-secret-key';
app.use(express.json())
// // Create a middleware function that verifies the JWT for each incoming request
// // const authenticateJwt = expressJwt({ secret: secret, algorithms: ['HS256'] });

// // Login endpoint - generates and returns a JWT
// app.post('/login', (req, res) => {
//   // In a real application, you would authenticate the user and retrieve their user ID from a database
//   const userId = 123;
  
//   // Generate a JWT using the user ID as the payload
//   const token = jwt.sign({ userId: userId }, secret, { expiresIn: '1h' });
  
//   // Return the JWT to the client
//   res.json({ token: token });
// });

const authenticate = require("./Router/auth")
app.use('/auth',authenticate)

// Protected endpoint - requires a valid JWT
app.get('/', (req, res) => {
  res.json({ message: 'You have access to this protected endpoint!' });
});

// Start the server
app.listen(process.env.SERVER_PORT, () => console.log(`Server started on port ${process.env.SERVER_PORT}.`));
