const User = require('../model/UserModel');

const createAdmin = async (adminData) => {

    const admin =new User(adminData);

    return await admin.save();
}

const getAdmins = async () => {
    try {
      const admins = await User.find({ role: 'admin' });
      return admins;
    } catch (error) {
      throw new Error('Error fetching admins: ' + error.message);
    }
  };

module.exports = { createAdmin , getAdmins };