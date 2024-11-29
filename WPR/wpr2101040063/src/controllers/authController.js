const dbConnection = require("../config/dbConnection");

async function renderSignInPage(req, res) {
  const userId = req.cookies?.userId;

  if (userId) {
    return res.redirect("/");
  }
  res.render("auth/signin", { error: null });
}

async function signin(req, res) {
  const { email, password } = req.body;

  try {
    // Get user from db
    const [users] = await dbConnection.execute(
      `SELECT * FROM users WHERE email = ?`,
      [email]
    );

    const user = users[0];
    if (!user) {
      return res.render("auth/signin", {
        error: "Email has not been registered",
        layout: false,
      });
    }

    // Compare password
    const match = password === user.password;

    // Invalid credentials
    if (!match) {
      return res.render("auth/signin", {
        error: "Invalid email or password",
      });
    }

    res.cookie("userId", user.id);

    res.redirect("/");
  } catch (error) {
    console.error("Error during sign-in:", error);
    res.render("auth/signin", {
      error: "An error occurred during sign-in",
    });
  }
}

async function renderSignUpPage(req, res) {
  const userId = req.cookies?.userId;

  if (userId) {
    return res.redirect("/");
  }
  res.render("auth/signup", { error: null, success: null });
}

async function signup(req, res) {
  const { fullName, email, password, confirmPassword } = req.body;

  try {
    // Check if email already exists
    const [existingUsers] = await dbConnection.execute(
      "SELECT id FROM users WHERE email = ?",
      [email]
    );

    // collapse email
    if (existingUsers.length > 0) {
      return res.render("auth/signup", {
        error: "Email address is already in use",
        success: null,
        values: { fullName, email },
        layout: false,
      });
    }

    // unmatch cfpw
    if (password !== confirmPassword) {
      return res.render("auth/signup", {
        error: "Unmatched confirm password",
        success: null,
        values: { fullName, email },
        layout: false,
      });
    }

    if (password.length < 6) {
      return res.render("auth/signup", {
        error: "Password must have more than 6 digits",
        success: null,
        values: { fullName, email },
        layout: false,
      });
    }

    // Insert new user
    const isSignedUp = await dbConnection.execute(
      "INSERT INTO users (full_name, email, password) VALUES (?, ?, ?)",
      [fullName, email, password]
    );

    if (!isSignedUp) {
      res.render("auth/signup", {
        error: "Something went wrong!",
        success: null,
        values: null,
        layout: false,
      });
    }
    // Show success message
    res.render("auth/signup", {
      error: null,
      success: "Account created successfully! You can now sign in.",
      values: {},
      layout: false,
    });
  } catch (error) {
    console.error("Error during sign-up:", error);
    res.render("auth/signup", {
      error: "An error occurred during sign-up",
      success: null,
      values: { fullName, email },
      layout: false,
    });
  }
}

async function signout(req, res) {
  res.clearCookie("userId");

  res.redirect("/signin");
}

module.exports = {
  renderSignInPage,
  renderSignUpPage,
  signin,
  signup,
  signout,
};
