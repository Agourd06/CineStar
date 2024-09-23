const AdminService = require('../service/AdminService');

const createAdmin = async (req, res) => {
    try {

        const NewAdmin = await AdminService.createAdmin(req.body);

        res.status(201).json({
            message: "Admin created succesfully",
            user: NewAdmin
        })
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
}


const getAdmins = async (req, res) => {
    try {
      const admins = await AdminService.getAdmins();
  
      res.status(200).json({ success: true, data: admins });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };

  
module.exports = {
    createAdmin,
    getAdmins
};