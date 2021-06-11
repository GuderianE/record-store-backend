const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const cookieParser = require("cookie-parser");
const userRouters = require("./routes/userRouters");
const recordRouters = require("./routes/recordRouters");
const loginRouters = require("./routes/loginRouters");
const meRouters = require("./routes/meRouters");
const logoutRouters = require("./routes/logoutRouters");
const PORT = process.env.PORT || 5001;
const env = require('./config/config');
require("dotenv").config();

//INITIALISE BACKEND
app.listen(PORT, () => {
  console.log(`Backend initialised on port: ${PORT}`);
});

app.get('/', (req, res) => {
  res.send('Review Api');
});

//MIDDLEWARE
app.use(express.json());
app.use(
  cors()
);
app.use(cookieParser());
app.use("/statics", express.static("statics")); // share files in statics folder on route /statics

//MONGODB SETUP
const dbString = env.db;
const dbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
};
mongoose
  .connect(dbString, dbOptions)
  .then(() => console.log("MongDB connected..."))
  .catch((err) => console.log(`Error: ${err}`));


// ROUTES
app.use("/users", userRouters);
app.use("/records", recordRouters);
app.use("/login", loginRouters);
app.use("/logout", logoutRouters);
app.use("/me", meRouters);

// ERROR HANDLER
app.use(function errorHandler(err, req, res, next) {
  console.log(err);
  res.status(err.status || 500).send({ error: { message: err.message } });
});
