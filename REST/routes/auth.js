const express = require("express");
const feedController = require("../controllers/feed");

const router = express.Router();
/*
******
 /login/auth
******
*/
router.get("/auth", feedController.getAuth);
router.post("/auth", feedController.postAuth);

module.exports = router;
