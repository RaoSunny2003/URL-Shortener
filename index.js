const express = require("express");
const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const userRoute = require("./routes/user");
const { connectMongoDB } = require("./connect");
const { URL } = require("./model/url");
const path = require("path");
const cookieParser = require("cookie-parser");
const {
  restrictedTologedinUserOnly,
  cheakAuth,
} = require("./middlewares/auth");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/url", restrictedTologedinUserOnly, urlRoute);
app.use("/user", userRoute);
app.use("/", cheakAuth, staticRoute);

app.get("/url/:shortId", async (req, res) => {
  const shortID = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortID,
    },
    {
      $push: {
        vistHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  res.redirect(entry.redirectURL);
});

const PORT = 3001;
connectMongoDB()
  .then(() => console.log("MongoDB Connected!"))
  .catch((err) => console.log("ERROR:", err));

app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`));
