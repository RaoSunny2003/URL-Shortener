const express = require("express");
const {
  handleGenrateShortURL,
  handleAnalytics,
} = require("../controllers/url");

const router = express.Router();

router.post("/", handleGenrateShortURL);

router.get("/analytics/:id", handleAnalytics);

module.exports = router;
