const jwt = require('jsonwebtoken'); 

function UserId(req) {
    try {
        const authHeader = req.header('Authorization');
        if (!authHeader) {
            throw new Error('Authorization header is missing');
        }

        const token = authHeader.split(' ')[1];
        if (!token) {
            throw new Error('Token is missing from Authorization header');
        }

        const decoded = jwt.verify(token, process.env.SECRET);
        return decoded.userId;
    } catch (error) {
        throw new Error('Invalid token or Authorization header');
    }
}

module.exports = { UserId };
