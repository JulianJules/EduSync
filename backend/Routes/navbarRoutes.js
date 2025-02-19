const express = require("express");
const router = express.Router();
const authenticateUser = require("../middleware/authMiddleware")


router.get("/cookie", authenticateUser, (req,res) => {
    res.json({loggedIn: true})
});

router.post("/logout", authenticateUser, (req, res) => {
    res.cookie('token', '', {
        httpOnly: true,
        secure: true, // Use true if you're using HTTPS
        sameSite: 'Lax',
        expires: new Date(0), // Expire immediately
      });
      res.json({ message: 'Logged out successfully' });
})

router.post("/id", authenticateUser, (req, res) => {
    res.json({id: req.user._id})
    
})

module.exports = router;