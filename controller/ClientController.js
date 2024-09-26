const UserService = require('../service/ClientService');

const getClient = async (req, res) => {

    try {
        const {
            id
        } = req.params
        const user = UserService.getClient(id)
        if (!user) {
           return res.status(404).send("User Not found")
        }
        res.status(200).json({
            successes : true,
            user : user
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

module.exports = {getClient};