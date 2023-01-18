const express = require("express");
const path = require("path");
const rootDir = require("../util/path");
const adminData = require("./admin");
const router = express.Router();

router.get("/", (req, res, next) => {
  console.log(adminData.registry);

  // res.status(200).send(adminData.products);
  /*without using template engine */

  // res.sendFile(path.join(rootDir, "client", "views", "users.html"))
  /*now using template engine */
  const registry = adminData.registry;
  res.render("users", {
    pageTitle: "Users",
    register: registry,
    docTitle: "Users",
    path: "/users",
    hasUsers: registry.length > 0,
    activeUser: true,
    // layout: false,
  });
});

module.exports = router;
