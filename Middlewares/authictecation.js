const jwt = require('jsonwebtoken')
require('dotenv').config();

const isLoggedIn = (req ,res ,next) => {
    try {
        const token = req.headers.authorization;
        if(!token) {
            return res.status(401).json({ message : 'لم يتم توفير رمز الدخول'})
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.currentUser = decoded;
        return next()
    } catch (error) {
        res.status(500).json(error);
    }
    
}

module.exports = isLoggedIn