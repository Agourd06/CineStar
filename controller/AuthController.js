const authService = require('../service/authService');

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

module.exports = {
  login,
  register
};