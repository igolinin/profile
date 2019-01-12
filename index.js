require("express-async-errors");
require("dotenv").config();
const error = require("./middleware/error");
const express = require("express");
const public = require("./routes/public");
const service = require("./routes/service");
const bodyParser = require("body-parser");
const config = require("config");
const database = config.get("db.host");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const app1 = express();
const app2 = express();

mongoose
  .connect(
    database,
    { useNewUrlParser: true }
  )
  .then(() => console.log("connected to mongo db at ", database))
  .catch(err => console.log("cannot connect to db", err));
const db = mongoose.connection;

app1.use(cors());
app1.use(bodyParser.urlencoded({ extended: false }));
app1.use(bodyParser.json());
app1.use(morgan("tiny"));

app2.use(bodyParser.urlencoded({ extended: false }));
app2.use(bodyParser.json());
app2.use(morgan("tiny"));

app1.get("/", (req, res) => {
  res.send("OK here");
});

app1.use("/api/v1/public", public);
app2.use("/api/v1/service", service);

app1.use(error);
app2.use(error);

app1.listen(8080, () => console.log("server started on port 8080"));
app2.listen(9090, () => console.log("server started on port 9090"));

module.exports = app1;
