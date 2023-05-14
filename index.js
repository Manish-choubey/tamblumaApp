// server.js
const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/route.js')
const app = express();
const port = 5000;
app.use(express.json());

// MongoDB connection
const MONGODB_URI = "mongodb+srv://functionup-cohert:yCRgEggIFfjlaB8o@sl0yd7n.mongodb.net/?retryWrites=true&w=majority" // Modify with your MongoDB connection URL

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,

})
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.error('Failed to connect to MongoDB', error))


  app.use('/', routes)




// Start the server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
