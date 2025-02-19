require('dotenv').config()
const express = require("express");
const mongoose = require("mongoose");
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;
const userRoute = require("./Routes/userRoutes")
const openAI = require("./Routes/openaiRoutes")
const cookie = require("./Routes/navbarRoutes")
const https = require('https')
const path = require('path')
const fs= require('fs')
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const streamController = require('./Controller/streamController'); // Importing the stream handling file



// express app
const app = express();

//middleware
app.use(express.json())
app.use(helmet());
app.use(cors({
  origin: 'https://localhost:3000', // Your frontend URL
  credentials: true, // Allow cookies to be sent
}));
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
  });

const sslServer = https.createServer({
  key: fs.readFileSync(path.join(__dirname, 'cert', 'localhost-key.pem')),
  cert: fs.readFileSync(path.join(__dirname, 'cert', 'localhost-cert.pem'))
}, app)

mongoose.set("strictQuery", false);

// connecting to MongoDB Atlas database
mongoose
   .connect(MONGO_URI)
   .then(() => {
     // listens for requests
     sslServer.listen(PORT, () => {
       console.log(`Connected to DB & Listening on secure server on port ${PORT}`);
     });
   })
   .catch((error) => {
    console.log(error);
   });  

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 100, // Max 100 requests per windowMs per IP
  message: { error: "Too many requests, please try again later." },
  headers: true, // Sends rate limit info in response headers
});


// ROUTES
// app.get('/api/chat', streamController.handleStream); // Call the streamController for SSE logic
app.use("/api/users", userRoute);
app.use("/api/openai", limiter, openAI)
app.use("/api/navbar", cookie)
app.get('/', (req, res) => {
    res.json({mssg: "Welcome to the app"})
})