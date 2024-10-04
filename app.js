const express = require('express');
const app = express();
const adminRoute = require('./routes/AdminRoute.js')
const clientRoute = require('./routes/ClientRoute.js')
const publicRoute = require('./routes/PublicRoute.js')
const authRoute = require('./routes/authRoute.js')
require('dotenv').config();
const dbConnect = require('./config/dataBase')
const verifyToken = require('./middleware/authMiddleware.js');
const checkRole = require('./middleware/checkRoleMiddleware.js');
const cors = require('cors');
const path = require('path')

dbConnect();
app.use(cors({
  origin: 'http://localhost:5173', 
  methods: ['GET', 'POST','PUT'],
  credentials: true, 
}));
app.use(express.static(path.join(__dirname, 'uploads')))
app.use(express.json());
app.use('/api/admin', verifyToken, checkRole('admin'), adminRoute);
app.use('/api/auth', authRoute);
app.use('/api/client', verifyToken, checkRole('client'), clientRoute)
app.use('/api/public', publicRoute)


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;