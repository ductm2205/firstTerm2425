const express = require("express");
const app = express();

// Define the route to handle rectangle calculations
app.get("/math/rectangle/:width/:height", (req, res) => {
  const width = parseFloat(req.params.width);
  const height = parseFloat(req.params.height);

  // Validate if width and height are valid numbers
  if (isNaN(width) || isNaN(height) || width <= 0 || height <= 0) {
    return res
      .status(400)
      .json({
        error: "Invalid width or height. Please provide positive numbers.",
      });
  }

  const area = width * height;
  const perimeter = 2 * (width + height);

  // Send response in JSON format with area and perimeter
  res.json({
    area: area,
    perimeter: perimeter,
  });
});

// Start the server on port 3000
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
