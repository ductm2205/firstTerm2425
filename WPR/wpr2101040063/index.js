const app = require("./src/app");
require("dotenv").config();

const PORT = process.env.APP_PORT;
const HOST = process.env.APP_HOST;

// 
const server = app.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}/`);
});

// 
server.on("error", (error) => {
  if (error.code === "EADDRINUSE") {
    console.error(`Port ${PORT} is already in use`);
  } else {
    console.error("Server error:", error);
  }
  process.exit(1);
});
