const express = require("express");
const cookieParser = require("cookie-parser");
const fs = require("fs");

const { encryptText, decryptText } = require("./act01/common");

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.set("view engine", "ejs");

const secretKey = "ABCDEFGH12345678";

app.use((req, resp, next) => {
  // decrypt req.cookies
  for (const [name, value] of Object.entries(req.cookies)) {
    req.cookies[name] = decryptText(value, secretKey);
  }

  // encrypt resp.cookie
  const origin = resp.cookie;
  resp.cookie = function (name, value, options) {
    return origin.call(this, name, encryptText(value, secretKey), options);
  };

  // call the middleware
  next();
});

app.get("/login", (req, resp) => {
  resp.render("login", { error: null });
});

app.post("/login", (req, resp) => {
  const { username, password } = req.body;
  const users = JSON.parse(fs.readFileSync("users.json", "utf-8"));

  const user = users.find(
    (user) => user.username == username && user.password == password
  );

  if (user) {
    resp.cookie("user", user.id.toString(), { maxAge: 900000, httpOnly: true });
    resp.redirect("/profile");
  } else {
    resp.render("login", { error: "Invalid credentials!" });
  }
});

app.get("/profile", (req, res) => {
  const userId = req.cookies.user;
  const users = JSON.parse(fs.readFileSync("users.json", "utf8"));

  const user = users.find((u) => u.id.toString() === userId);

  if (user) {
    res.render("profile", { user });
  } else {
    res.redirect("/login");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
