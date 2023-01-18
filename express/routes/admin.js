const express = require("express");
const path = require("path");
const rootDir = require("../util/path");

const router = express.Router();
const registry = [];

router.get("/add_users", (req, res, next) => {
  console.log(`Welcome to users route`);
  // res.sendFile(path.join(rootDir, "client", "views", "add-users.html"));
  res.render("add_users", {
    pageTitle: "Add-users",
    path: "/admin/add-users",
    activeAddUser: true,
  });
});

router.post("/users", (req, res, next) => {
  // const { title } = req.body;
  // console.log(req.body, title);
  // res.send(`The new user added is: ${title}`);
  registry.push({ title: req.body.title });
  res.redirect("/");
});
exports.routes = router;
exports.registry = registry;
