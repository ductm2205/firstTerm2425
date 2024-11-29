// Import the built-in http module
const http = require("http");
const url = require("url");

// Create an HTTP server
const server = http.createServer((req, res) => {
  // Parse the URL
  const parsedUrl = url.parse(req.url, true);

  // Check if the path is '/hello'
  if (parsedUrl.pathname === "/hello") {
    // Extract the name query parameter
    const name = parsedUrl.query.name;

    // If name is provided, send a personalized greeting
    if (name) {
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end(`Hello ${name}`);
    } else {
      // If name is not provided, send a 400 Bad Request
      res.writeHead(400, { "Content-Type": "text/plain" });
      res.end("Bad Request: name query parameter is missing");
    }
  } else {
    // If the path is not '/hello', send a 404 Not Found
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
  }
});

// Start the server on port 3000
server.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
