const express = require("express");
const { signup_User, loginUser } = require("../Controller/userController");
const router = express.Router();
const authenticateUser = require("../middleware/authMiddleware")


//Login Routes
router.post("/login", loginUser);

//Sign Up Routes
router.post("/signup", signup_User);


module.exports = router;