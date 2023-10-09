const { v4: uuidv4 } = require("uuid");
const { USER } = require("../model/user");
const { setUser } = require("../service/auth");

async function handleUserSignup(req, res, next) {
  const { username, email, password } = req.body;

  const cheackUsername = await USER.findOne({ username });
  const cheackEmail = await USER.findOne({ email });
  if (cheackUsername) return res.status(400).redirect("/signup");
  if (cheackEmail) return res.status(400).redirect("/signup");

  await USER.create({
    username,
    email,
    password,
  });

  return res.redirect("/");
}
async function handleUserLogin(req, res, next) {
  const { email, password } = req.body;

  const cheackUser = await USER.findOne({ email, password });
  if (!cheackUser) return res.status(404).render("login");

  const token = setUser(cheackUser);
  res.cookie("uid", token);

  return res.redirect("/");
}

module.exports = { handleUserLogin, handleUserSignup };
