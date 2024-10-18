const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/UserModel');
const nodemailer = require('nodemailer');




const login = async (email, password) => {
  const user = await User.findOne({
    email,
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
  const UserInfo = {
    role: user.role,
    userId: user._id
  }
  //checking for user and store Token
  const token = jwt.sign({
    UserInfo: UserInfo
  }, SecretKey, {
    expiresIn: '1h'
  });


  return token;
};





const register = async (userData) => {

  const user = new User(userData);

  return await user.save();
};


const sendPasswordResetEmail = async (email) => {
  const user = await User.findOne({
    email
  });
  if (!user) {
    throw new Error('User not found');
  }

  const UserInfo = {
    role: user.role,
    userId: user._id
  }

  const resetToken = jwt.sign({
    UserInfo: UserInfo
  }, process.env.SECRET, {
    expiresIn: '15m'
  });

  // Send email with reset link
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  const resetURL = `http://localhost:5173/auth/reset?token=${resetToken}`;
  const mailOptions = {
    to: user.email,
    from: process.env.EMAIL,
    subject: 'Password Reset',
    html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ccc; border-radius: 8px;">
                <h1 style="color: #333;">CineStar</h1>
                <h2 style="color: #333;">Password Reset Request</h2>
                <p style="color: #555;">
                    You requested a password reset. Please click the button below to reset your password:
                </p>
                <a href="${resetURL}" style="
                    display: inline-block; 
                    padding: 12px 20px; 
                    margin: 20px 0; 
                    color: white; 
                    background-color: #007bff; 
                    border: none; 
                    border-radius: 4px; 
                    text-decoration: none; 
                    font-weight: bold;"
                >
                    Reset Password
                </a>
                <p style="color: #555;">
                    If you did not request a password reset, please ignore this email.
                </p>
                <p style="color: #777;">Thank you!</p>
                   <footer style="margin-top: 20px; font-size: 12px; color: #999;">
                    <p>If you have any questions, feel free to contact us at CineStar@movies.com.</p>
                    <p>&copy; ${new Date().getFullYear()} CineStar. All rights reserved.</p>
                </footer>
            </div>
        `
  };

  await transporter.sendMail(mailOptions);
  return {
    message: 'Password reset email sent'
  };
};

const resetPassword = async (token, newPassword) => {
  const decoded = jwt.verify(token, process.env.SECRET);
  const user = await User.findById(decoded.UserInfo.userId);
  if (!user) {
    throw new Error('User not found');
  }

  user.password = newPassword;
  await user.save();
  return {
    message: 'Password has been reset'
  };
};

module.exports = {
  login,
  register,
  sendPasswordResetEmail,
  resetPassword
};