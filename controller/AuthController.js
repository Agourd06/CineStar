const authService = require('../service/AuthService');

const login = async (req, res) => {
  try {
    const {
      email,
      password,
    } = req.body;

    const token = await authService.login(email, password);

    if (!token) {
      return res.status(401).json({
        error: 'Authentication failed'
      });
    }

    res.status(200).json({
      token,
      name: "ana"
    });
  } catch (error) {

    res.status(500).json({
      error: 'Login failed'
    });

  }
};


const register = async (req, res) => {
  try {

    const newUser = await authService.register(req.body);
    res.status(201).json({
      message: 'User created successfully',
      user: newUser
    });
  } catch (error) {
    console.error(error);
    if (error.code === 11000) {
      return res.status(400).json({
        message: 'Email already exists'
      });
    }
    res.status(500).json({
      message: 'Failed to create user',
      error: error.message
    });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const {
      email
    } = req.body;
    const response = await authService.sendPasswordResetEmail(email);
    res.json(response);
  } catch (error) {
    res.status(404).json({
      message: error.message
    });
  }
};

const resetPasswordHandler = async (req, res) => {
  const {
    token
  } = req.params;
  const {
    password,
    confirmPassword
  } = req.body;

  if (password !== confirmPassword) {
    return res.status(403).send("please check password Confirmation")
  }
  try {
    const response = await authService.resetPassword(token, password);
    res.json(response);
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(400).json({
        message: 'Token has expired'
      });
    }
    res.status(404).json({
      message: error.message
    });
  }
};



module.exports = {
  login,
  register,
  forgotPassword,
  resetPasswordHandler
};