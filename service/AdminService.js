const User = require('../model/UserModel');

const createUser = async (userData) => {
  try {

    const user = new User(userData);

    return await user.save();
  } catch (error) {
    throw new Error('user is not added : ' + error.message)
  }
}



const getUsers = async (adminId, page = 1, limit = 5) => {
  try {
    const skip = (page - 1) * limit;

    const users = await User.find({
        _id: {
          $ne: adminId
        },
        deleted_at : null
      })
      .skip(skip)
      .sort({
        createdAt: -1
      })
      .limit(limit);

    return users;
  } catch (error) {
    throw new Error('Error fetching users: ' + error.message);
  }
};


const getUser = async (userId) => {


  try {
    const user = await User.findOne({
      _id: userId,
      deleted_at: null
    });
    return user;
  } catch (error) {
    throw new Error('Error fetching user: ' + error.message);
  }
}


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




const archiveUser = async (userId) => {
  try {
    const user = await User.findOneAndUpdate({
        _id: userId
      },

      [{
        $set: {
          deleted_at: {
            $cond: {
              if: {
                $eq: ["$deleted_at", null]
              },
              then: new Date(),
              else: null
            }
          }
        }
      }], {
        new: true
      }
    );


    if (!user) {
      throw new Error('Admin not found');
    }

    return user;
  } catch (error) {
    throw new Error('Error soft-deleting admin: ' + error.message);
  }
};



module.exports = {
  createUser,
  getUsers,
  getUser,
  updateAdmins,
  archiveUser
};