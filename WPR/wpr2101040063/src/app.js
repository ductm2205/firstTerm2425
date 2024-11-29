const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const fs = require("fs");

const app = express();

// setup middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// create uploads directory if it doesn't exist
const uploadDir = path.join(__dirname, "/public/uploads/");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// setup ejs
app.set("view engine", "ejs");
// set static view templates folder
app.set("views", path.join(__dirname, "views"));

// setup routes
const auth = require("./routes/authRoutes");
const emails = require("./routes/emailRoutes");
const { isAuthenticated } = require("./middlewares/authMiddleware");

//

app.use("/", auth);
app.use("/", isAuthenticated, emails);

//
module.exports = app;
