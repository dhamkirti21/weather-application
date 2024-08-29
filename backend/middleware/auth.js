const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'qk3MJ6QYr1R2vzCH6pgHGgPdAhdju0';

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

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(400).json({ message: 'Invalid token.' });
    }
};



module.exports = {
    generateToken,
    verifyToken,
};
