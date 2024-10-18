const jwt = require('jsonwebtoken'); 

function UserId(req) {
    try {
        const authHeader = req.header('Authorization');
        if (!authHeader) {
            throw new Error('Authorization header is missing');
        }

        const token = authHeader.split(' ')[1];
        if (!token) {
            throw new Error('Token is missing');
        }

        const decoded = jwt.verify(token, process.env.SECRET);
        
        return decoded.UserInfo.userId;
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = { UserId };
