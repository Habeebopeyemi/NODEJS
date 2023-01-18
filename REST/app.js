const bodyParser = require("body-parser");
const express = require("express");
const AuthRoutes = require("./routes/auth");

const app = express();
// method below is use for accepting form input: x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); //for application/json

/* dealing with CORS */
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
app.use("/login", AuthRoutes);

app.listen(8080);
