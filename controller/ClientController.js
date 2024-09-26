const UserService = require('../service/ClientService');
const {
    UserId
} = require('../helpers/helpers');
const getClient = async (req, res) => {

    try {
        let userId = UserId(req)

        const user = await UserService.getClient(userId)
        if (!user) {
            return res.status(404).send("User Not found")
        }

        res.status(200).json({
            successes: true,
            user: user
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

module.exports = {
    getClient
};