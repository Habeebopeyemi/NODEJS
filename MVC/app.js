const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const productsController = require("./controllers/error")

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRouter = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRouter.routes);
app.use(shopRoutes);

app.use(productsController.pageNotFound);

app.listen(3000);

