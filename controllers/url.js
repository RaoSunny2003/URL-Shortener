const short = require("shortid");

const { URL } = require("../model/url");
const { reset } = require("nodemon");

async function handleGenrateShortURL(req, res) {
  const body = req.body;
  if (!body.url)
    return res.status(400).json({ msg: "Please enter URL Firstly...!!!" });
  const shortId = short();
  await URL.create({
    shortID: shortId,
    redirectURL: body.url,
    vistHistory: [],
    createdBy: req.user._id,
  });

  return res.render("home", { id: shortId });
}

async function handleAnalytics(req, res) {
  const id = req.params.id;
  const analyis = await URL.findOne({ id });
  res.json({
    totalClicks: analyis.vistHistory.length,
    analytics: analyis.vistHistory,
  });
}

module.exports = { handleGenrateShortURL, handleAnalytics };
