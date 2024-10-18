const jwt = require('jsonwebtoken');
const UserModel = require('../model/UserModel'); 

async function verifyToken(req, res, next) {
    const authHeader = req.header('Authorization');

    if (!authHeader) {
        return res.status(401).json({
            error: 'Access denied'
        });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            error: 'Token missing'
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET);
        req.userId = decoded.UserInfo.userId; 

        const currentUser = await UserModel.findOne({
            _id: req.userId,
            deleted_at: null 
        });

        if (!currentUser) {
            return res.status(401).json({
                error: 'User not found or deleted'
            });
        }

        req.user = currentUser;

        next();
    } catch (error) {
        res.status(401).json({
            error: 'Invalid token'
        });
    }
}

module.exports = verifyToken;
