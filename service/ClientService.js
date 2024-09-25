const User = require('../model/UserModel');


const getClient = async (clientId) => {
    try {
      const client = await User.findOne({
        role: 'client',
        _id: clientId,
        deleted_at: null
      });
      return client;
    } catch (error) {
      throw new Error('Error fetching Client: ' + error.message);
    }
  };
  

module.exports = { getClient };
