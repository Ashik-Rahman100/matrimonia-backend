const express = require("express");
const json = require("express").json;
const cors = require("cors");
const mongoose = require("mongoose");
const rootRouter = require("./routes/index.js");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
//middlewares

//merge problem

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(json());
app.use(cors());
app.use(cookieParser());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:3000",
      "http://localhost:5000",
      "https://demo-marriage-universesoftcare.vercel.app",
      "https://abinash-dashboard.netlify.app",
      "https://abinash-website.netlify.app",
      "https://demo-marriage-media-rs.netlify.app",
      "http://serverapi.jutibadhi.com",
      "https://jutibadhi.com",
      "http://demo.jutibadhi.com",
    ],
    optionsSuccessStatus: 200,
    credentials: true,
  })
);

app.use("/api/v1", rootRouter);

app.get("/", (req, res) => {
  res.send("Route is working! YaY!");
});

app.all("*", (req, res) => {
  res.send("No Route Found.");
});

module.exports = app;
