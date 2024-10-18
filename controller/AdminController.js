const AdminService = require('../service/AdminService');
const {
    createAdminSchema,
    updateAdminSchema
} = require('../validations/AdminValidations.js')
const {
    UserId
} = require('../helpers/helpers');
const createUser = async (req, res) => {
    try {

        const {
            error
        } = createAdminSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                message: error.details[0].message
            });
        }

        const newUser = await AdminService.createUser(req.body);

        res.status(201).json({
            message: "User created succesfully",
            user: newUser
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Failed to create user',
            error: error.message
        });

    }
}


const getUsersController = async (req, res) => {
    try {
        const { page = 1, limit = 5 } = req.query;
        const adminId = UserId(req); 
        const users = await AdminService.getUsers(adminId, Number(page), Number(limit));

        res.status(200).json({
            success: true,
            data: users
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


const getUser = async (req, res) => {
    try {

        const userId = UserId(req)

        const user = await AdminService.getUser(userId);

        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

const updateUser = async (req, res) => {
    try {
        const {
            id
        } = req.params;
        const {
            error
        } = updateAdminSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                message: error.details[0].message
            });
        }
        const updatedAdmin = await AdminService.updateAdmins(id, req.body);

        if (!updatedAdmin) {
            return res.status(404).json({
                message: "Admin not found"
            });
        }

        res.status(200).json({
            message: "Admin updated successfully",
            user: updatedAdmin
        });
    } catch (error) {
        console.error("Error updating admin:", error);
        
        res.status(500).json({
            message: "Failed to update admin",
            error: error.message
        });
    }
};
const archiveUser = async (req, res) => {
    try {
        const {
            id
        } = req.params;
        const archivedUser = await AdminService.archiveUser(id);

        if (!archivedUser) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json({
            message: "User Archived successfully",
            user: archivedUser
        });
    } catch (error) {
        console.error("Error deleting user:", error);

        res.status(500).json({
            message: "Failed to delete user",
            error: error.message
        });
    }
};



module.exports = {
    createUser,
    getUsersController,
    getUser,
    updateUser,
    archiveUser
};