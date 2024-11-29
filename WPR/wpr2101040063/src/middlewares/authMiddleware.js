const { getUserById } = require("../utils/userQueries");

async function isAuthenticated(req, res, next) {
  const userId = req.cookies.userId;

  if (!userId) {
    res.clearCookie("userId");
    return res.redirect("/signin");
  }
  try {
    const user = await getUserById(userId);

    if (!user) {
      res.clearCookie("userId");
      return res.redirect("/signin");
    }

    res.cookie("userId", userId, { maxAge: 3600000 });

    req.user = user;

    return next();
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
}

module.exports = { isAuthenticated };
