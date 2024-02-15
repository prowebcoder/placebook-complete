const express = require("express");
const port = 4000;
const HttpError = require("./models/http-error");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const app = express();
app.use(bodyParser.json());
app.use("/uploads/images", express.static(path.join("uploads", "images")));
const placeRouter = require("./routes/place-routes");
const userRouter = require("./routes/user-routes");

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, PATCH");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With,Content-Type, Authorization"
  );
  next();
});

app.use("/api/places", placeRouter);
app.use("/api/users", userRouter);
app.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (req.file) {
    fs.unlink(req.file.path, (err) => {
      console.log(err);
    });
  }
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
});

// dhiman639
// roAvGjcDJ4LeVFYo

mongoose
  .connect(
    "mongodb+srv://dhiman639:roAvGjcDJ4LeVFYo@cluster0.0ykzr5f.mongodb.net/placebook"
  )
  .then(() => {
    console.log("Connected");
    app.listen(port);
  })
  .catch((err) => {
    console.log("This is catch error :", err);
  });
