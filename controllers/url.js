const short = require("shortid");

const { URL } = require("../model/url");

async function handleGenrateShortURL(req, res) {
  const body = req.body;
  if (!body.url)
    return res.status(400).json({ msg: "Please enter URL Firstly...!!!" });
  const shortId = short();
  await URL.create({
    shortID: shortId,
    redirectURL: body.url,
    vistHistory: [],
  });

  res.json({ id: shortId });
}

module.exports = { handleGenrateShortURL };
