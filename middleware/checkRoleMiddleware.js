const jwt = require('jsonwebtoken');



const checkRole = (requiredRole) => {

    return (req, res, next) => {

      const token = req.headers.authorization && req.headers.authorization.split(' ')[1]; 
  
      if (!token) {
        return res.status(403).json({ message: 'Access denied. No token provided.' });
      }
  
      try {
        
        const decoded = jwt.verify(token, process.env.SECRET);
  
        if (decoded.role !== requiredRole) {
          return res.status(403).json({ message: 'Access denied. Your role permissions cant go through this action.' });
        }
  
        req.user = decoded; 

        next();

      } catch (error) {

        return res.status(401).json({ message: 'Invalid token.' });

      }
    };
  };


 module.exports = checkRole;