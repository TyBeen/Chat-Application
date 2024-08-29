const jwt = require('jsonwebtoken');

function authentication (req, res, next) {
    const token = req.header('Authorization').replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.body._id = decoded.id;
        req.body.isAdmin = decoded.isAdmin;
        console.log(`Authenticated user ID: ${req.body._id}, Admin status: ${req.body.isAdmin}`);

        next();
    } catch (err) {
        res.status(400).json({ message: 'Invalid token' });
    }
};

module.exports = authentication;