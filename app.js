const express = require('express');
const app = express();
const adminRoute = require('./routes/AdminRoute.js')
const authRoute = require('./routes/authRoute.js')
require('dotenv').config();
const dbConnect = require('./config/dataBase')
const verifyToken = require('./middleware/authMiddleware.js');


dbConnect();

app.use(express.json());
app.use('/api/admin',verifyToken, adminRoute);
app.use('/api/auth', authRoute);



const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;