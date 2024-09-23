const User = require('../model/UserModel');

const createAdmin = async (adminData) => {
  try {

    const admin = new User(adminData);

    return await admin.save();
  } catch (error) {
    throw new Error('admins is not added : ' + error.message)
  }
}




const getAdmins = async () => {
  try {
    const admins = await User.find({
      role: 'admin',
      deleted_at: null
    });
    return admins;
  } catch (error) {
    throw new Error('Error fetching admins: ' + error.message);
  }
};




const updateAdmins = async (AdminId, adminUpdateData) => {
  try {
    const admin = await User.findOneAndUpdate({
        _id: AdminId
      },
      adminUpdateData, {
        new: true
      }
    );
    return admin;
  } catch (error) {
    throw new Error('Error updating admin: ' + error.message);

  }
};




const softDeleteAdmins = async (AdminId) => {
  try {
    const admin = await User.findOneAndUpdate(
      { _id: AdminId },
      { deleted_at: new Date() }, 
      { new: true }
    );
    
    if (!admin) {
      throw new Error('Admin not found');
    }

    return admin;
  } catch (error) {
    throw new Error('Error soft-deleting admin: ' + error.message);
  }
};



module.exports = {
  createAdmin,
  getAdmins,
  updateAdmins,
  softDeleteAdmins
};