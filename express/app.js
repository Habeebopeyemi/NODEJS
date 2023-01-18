const express = require("express");
const body_parser = require("body-parser");
const path = require("path");
// const expressHbs = require("express-handlebars");
// const rootDir = require("./util/path");
const adminData = require("./routes/admin");
const userRouter = require("./routes/users");
const app = express();
app.use(body_parser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
/*
****************************
setting up templating engine
****************************
app.set("view engine", "pug");
app.engine(
  "hbs",
  expressHbs({
    layoutDir: "client/views/layout/",
    defaultLayout: "main-layout",
    extname: "hbs",
  })
);
app.set("view engine", "hbs");
*/
app.set("view engine", "ejs");
app.set("views", "client/views");
// app.use(adminRouter);
// app.use(userRouter);
/*using filter */
app.use("/admin", adminData.routes);
app.use(userRouter);
app.use((req, res, next) => {
  // res.status(404).sendFile(path.join(rootDir, "client", "views", "404.html"));
  res.status(404).render("404", { pageTitle: "Not found" });
});
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`server running on http:localhost:${PORT}`);
});
