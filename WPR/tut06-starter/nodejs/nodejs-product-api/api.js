const http = require("http");
const {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} = require("./dataProvider");

// In-memory array to hold products (initially populated from the JSON file)
let products = getProducts();

// Create the server
const server = http.createServer((req, res) => {
  const { method, url } = req;

  // Helper function to send JSON response
  const sendJsonResponse = (statusCode, data) => {
    res.writeHead(statusCode, { "Content-Type": "application/json" });
    res.end(JSON.stringify(data));
  };

  // Helper function to get request body
  const getRequestBody = (req) => {
    return new Promise((resolve, reject) => {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk.toString();
      });
      req.on("end", () => {
        try {
          resolve(JSON.parse(body));
        } catch (error) {
          reject(error);
        }
      });
    });
  };

  // GET /products : Retrieve a list of all products
  if (method === "GET" && url === "/products") {
    sendJsonResponse(200, products);
  }
  // GET /products/:id : Retrieve information about a specific product by id
  else if (method === "GET" && url.startsWith("/products/")) {
    const id = parseInt(url.split("/")[2]);
    const product = products.find((p) => p.id === id);
    if (product) {
      sendJsonResponse(200, product);
    } else {
      sendJsonResponse(404, { message: "Product not found" });
    }
  }
  // POST /products : Add a new product to the list
  else if (method === "POST" && url === "/products") {
    getRequestBody(req)
      .then((body) => {
        const newProduct = addProduct(body);
        products = getProducts(); // Refresh the in-memory products
        sendJsonResponse(201, newProduct);
      })
      .catch((error) => {
        sendJsonResponse(400, { message: "Invalid request body" });
      });
  }
  // PUT /products/:id : Update information about a product by id
  else if (method === "PUT" && url.startsWith("/products/")) {
    const id = parseInt(url.split("/")[2]);
    getRequestBody(req)
      .then((body) => {
        try {
          const updatedProduct = updateProduct(id, body);
          products = getProducts(); // Refresh the in-memory products
          sendJsonResponse(200, updatedProduct);
        } catch (error) {
          sendJsonResponse(404, { message: error.message });
        }
      })
      .catch((error) => {
        sendJsonResponse(400, { message: "Invalid request body" });
      });
  }
  // DELETE /products/:id : Delete a product by id
  else if (method === "DELETE" && url.startsWith("/products/")) {
    const id = parseInt(url.split("/")[2]);
    try {
      const result = deleteProduct(id);
      products = getProducts(); // Refresh the in-memory products
      sendJsonResponse(200, result);
    } catch (error) {
      sendJsonResponse(404, { message: error.message });
    }
  }
  // Handle 404 Not Found for any other routes
  else {
    sendJsonResponse(404, { message: "Not Found" });
  }
});

// Start the server on port 3000
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
