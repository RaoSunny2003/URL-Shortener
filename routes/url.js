const express = require("express");
const { handleGenrateShortURL } = require("../controllers/url");

const router = express.Router();

router.post("/", handleGenrateShortURL);

module.exports = router;
