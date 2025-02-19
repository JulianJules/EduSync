const express = require("express");
const {chatBot} = require("../Controller/studyController");
const {handleStream} = require("../Controller/streamController")
const authenticateUser = require("../middleware/authMiddleware")
const router = express.Router();

router.post("/habit", authenticateUser, chatBot);
//router.get("/history", history);
//router.get("/habit2", logs)
router.get("/habit", handleStream)

module.exports = router;