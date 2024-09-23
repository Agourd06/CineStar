const sessionService = require('../service/SessionService')



const createSession = async (req, res) => {
    try {
        const newSession = await sessionService.createSession(req.body)

        res.status(201).json({
            massage: "Session Created succefully",
            Session: newSession
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Failed to create Session',
            error: error.message
        });
    }


}

const getAllSessions = async (req, res) => {
    try {
        const sessions = await sessionService.getAllSessions()

        res.status(200).json({
            success: true,
            data: sessions
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}







// -----------------Code for update status of sessios-----------------

const updateSessionsStatus = async (req, res) => {
    try {
        const updatedSessions = await sessionService.updateAllSessionsStatus();

        res.status(200).json({ message: 'Session statuses updated', updatedSessions });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// -----------------Code for update status of sessios-----------------

module.exports = {
    createSession,
    updateSessionsStatus,
    getAllSessions 
}