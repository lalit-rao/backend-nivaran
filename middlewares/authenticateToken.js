// import user from '../controllers/user';

const jwt = require('jsonwebtoken');
const User = require('../model/user');
const { sendError } = require('../utils/helper');

const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return sendError(res, 'Access Denied!');

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) return sendError(res, 'Invalid Token!', 401);

        try {
            const user = await User.findById(decoded.userId);
            if (!user) return sendError(res, 'User not found!');

            req.user = user;
            next();
        } catch (error) {
            console.error('Error finding user:', error);
            sendError(res, 'Something went wrong!', 500);
        }
    });
};

module.exports = authenticateToken;
