const jwt = require('jsonwebtoken');
// const redis = require("redis");
const JWT_SECRET = process.env.JWT_SECRET || 'qk3MJ6QYr1R2vzCH6pgHGgPdAhdju0';

const redisClient = redis.createClient();
const generateToken = (user) => {
    const payload = {
        id: user._id,
        email: user.email
    };

    const token = jwt.sign(payload, JWT_SECRET, {
        expiresIn: '12h',
    });

    return token;
};
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    // redisClient.get(token, (err, data) => {
    //     if (err) {
    //         return res.status(500).json({ message: 'Internal server error' });
    //     }
    //     if (data) {
    //         return res.status(401).json({ message: 'Invalid token.' });
    //     }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(400).json({ message: 'Invalid token.' });
    }
};

const blacklistToken = (token) => {
    const decoded = jwt.decode(token);
    const exp = decoded.exp * 1000;
    const ttl = exp - Date.now();
    redisClient.set(token, 'blacklisted', 'EX', Math.floor(ttl / 1000));
};

module.exports = {
    generateToken,
    verifyToken,
    blacklistToken
};
