const { getUser } = require("../service/auth");

async function restrictedTologedinUserOnly(req, res, next) {
  const userUid = req.cookies.uid;

  if (!userUid) return res.redirect("/login");
  const user = getUser(userUid);

  if (!user) return res.redirect("/login");

  req.user = user;
  next();
}

async function cheakAuth(req, res, next) {
  const userUid = req.cookies.uid;

  const user = getUser(userUid);

  req.user = user;
  next();
}

module.exports = { restrictedTologedinUserOnly, cheakAuth };
