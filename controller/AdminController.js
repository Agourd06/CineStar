const AdminService = require('../service/AdminService');
const {
    createAdminSchema,
    updateAdminSchema
} = require('../validations/AdminValidations.js')
const createAdmin = async (req, res) => {
    try {

        const {
            error
        } = createAdminSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                message: error.details[0].message
            });
        }
        req.body.role = 'admin';

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

        res.status(200).json({
            success: true,
            data: admins
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getAdmin = async (req, res) => {
    try {

        const {
            id
        } = req.params
        const admin = await AdminService.getAdmin(id);

        res.status(200).json({
            success: true,
            data: admin
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

const updateAdmins = async (req, res) => {
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
        if (error.code === 11000) {
            return res.status(400).json({
                message: 'Email already exists'
            });
        }
        res.status(500).json({
            message: "Failed to update admin",
            error: error.message
        });
    }
};
const softDeleteAdmins = async (req, res) => {
    try {
        const {
            id
        } = req.params;
        const updatedAdmin = await AdminService.softDeleteAdmins(id);

        if (!updatedAdmin) {
            return res.status(404).json({
                message: "Admin not found"
            });
        }

        res.status(200).json({
            message: "Admin Deleted successfully",
            user: updatedAdmin
        });
    } catch (error) {
        console.error("Error deleting admin:", error);

        res.status(500).json({
            message: "Failed to delete admin",
            error: error.message
        });
    }
};



module.exports = {
    createAdmin,
    getAdmins,
    getAdmin,
    updateAdmins,
    softDeleteAdmins
};