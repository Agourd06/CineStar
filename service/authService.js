const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/UserModel');




const login = async (email, password) => {
  const user = await User.findOne({
    email
  });
  if (!user) {
    return null;
  }

  // Comparing passwords

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return null;
  }
//My secret Key
  SecretKey = process.env.SECRET;

  //checking for user and store Token
  const token = jwt.sign({
    userId: user._id
  }, SecretKey, {
    expiresIn: '1h',
  });

  return token;
};

const register = async (userData) => {

  const user = new User(userData);

  return await user.save();
};

module.exports = {
  login,
  register
};