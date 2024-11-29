// Import the express module
const express = require("express");
const app = express();

// Define the /hello route
app.get("/hello", (req, res) => {
  const name = req.query.name;

  // Check if the name query parameter is provided
  if (name) {
    res.send(`Hello ${name}`);
  } else {
    res.status(400).send("Bad Request: name query parameter is missing");
  }
});

// Start the server on port 3000
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
