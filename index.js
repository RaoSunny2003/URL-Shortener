const express = require("express");
const urlRoute = require("./routes/url");
const { connectMongoDB } = require("./connect");
const { URL } = require("./model/url");

const app = express();

app.use(express.json());
app.use("/url", urlRoute);

app.get("/:shortid", async (req, res) => {
  const shortId = req.params.shortid;

  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        vistHistory: { timestamps: Date.now() },
      },
    }
  );

  if (entry) {
    res.redirect(entry.redirectURL);
  } else {
    res.status(404).send("URL not found");
  }
});

const PORT = 3000;
connectMongoDB()
  .then(() => console.log("MongoDB Connected!"))
  .catch((err) => console.log("ERROR:", err));

app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`));
