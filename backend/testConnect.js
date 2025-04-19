require('dotenv').config();  // This loads the .env file
const connectDB = require('./lib/connectDb');  // Adjust the path accordingly

connectDB();  // Run the connection test
