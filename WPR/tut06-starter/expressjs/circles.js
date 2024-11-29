const express = require("express");
const app = express();

// Define the route to handle circle calculations
app.get("/math/circle/:r", (req, res) => {
  const radius = parseFloat(req.params.r);

  // Validate if radius is a valid number
  if (isNaN(radius) || radius <= 0) {
    return res
      .status(400)
      .json({ error: "Invalid radius. Please provide a positive number." });
  }

  const area = Math.PI * radius * radius;
  const circumference = 2 * Math.PI * radius;

  // Send response in JSON format with area and circumference
  res.json({
    area: area.toFixed(2),
    circumference: circumference.toFixed(2),
  });
});

// Start the server on port 3000
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
