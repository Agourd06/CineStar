const sessionService = require('../service/SessionService')
const moment = require('moment');


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

const getAdminSessions = async (req, res) => {
    try {
        const sessions = await sessionService.getAdminSessions()


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



const editSession = async (req, res) => {
    try {

        const {
            id
        } = req.params
        const Session = await sessionService.editSession(id);

        res.status(200).json({
            success: true,
            data: Session
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

const updateSession = async (req, res) => {
    try {
        const {
            id
        } = req.params
        const updatedSession = await sessionService.updateSession(id, req.body);
        if (!updatedSession) {
            return res.status(404).send("session not found")
        }
        res.status(200).json({
            message: "session updated successfully",
            session: updatedSession
        })
    } catch (error) {
        console.error("error updating session", error)
        res.status(500).json({
            message: "Failed to update session",
            error: error.message
        })
    }
}

const deleteSession = async (req, res) => {
    try {
        const {
            id
        } = req.params
        const deletedSession = await sessionService.deleteSession(id);
        if (!deletedSession) {
            return res.status(404).send("Session not found")
        }
        res.status(200).json({
            message: "Session deleted successfully",
            Session: deletedSession
        })
    } catch (error) {
        console.error("error deleting Session", error)

        res.status(500).json({
            message: "Failed to delete Session",
            error: error.message
        })
    }
}





module.exports = {
    createSession,
    getAdminSessions,
    editSession,
    updateSession,
    deleteSession
}