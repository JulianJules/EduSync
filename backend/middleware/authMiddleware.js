const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');


const authenticateUser = (req, res, next) => {
    const cookie = req.headers.cookie
    if (!cookie) {
        return res.status(401).json({ message: 'No cookie found, user is not logged in.' });
    }
    const token = cookie.split('=')[1];
    const secret = process.env.ACCESS_TOKEN_SECRET
    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    try {
        const decoded = jwt.verify(token, secret)
        console.log('Token is valid:', decoded)
        req.user = decoded
        next()
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            console.log(error)
            return res.status(401).json({ message: 'Token expired' });
        }
        return res.status(400).json({ message: "Invalid token" });
    }
};

module.exports = authenticateUser;

