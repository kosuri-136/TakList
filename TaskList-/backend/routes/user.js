var express = require("express");
const userController = require("../controllers/user.js");
const router = express.Router();

router.post("/registeruser", userController.registerUser);
router.post("/login", userController.login);

module.exports = router;
