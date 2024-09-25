const Session = require('../model/SessionModel.js');
const moment = require('moment');



const createSession = async (sessionData) => {
    try {
        const newSession = new Session(sessionData)
        return await newSession.save()
    } catch (error) {
        throw new Error("Session can' be added " + error.message)
    }

}


const getAdminSessions = async () => {
    try {
        const sessions = await Session.find({
            deleted_at: null
        });

        return sessions;
    } catch (error) {
        throw new Error('Error fetching Sessions: ' + error.message);
    }
}

const editSession = async (sessionId) => {


    try {
        const session = await Session.find({
            _id: sessionId,
            deleted_at: null
        });
        return session;
    } catch (error) {
        throw new Error('Error fetching Session: ' + error.message);
    }
}



const updateSession = async (sessionId, sessionData) => {
    try {
        const updatedSession = await Session.findOneAndUpdate({
                _id: sessionId
            },
            sessionData, {
                new: true
            });
        return updatedSession
    } catch (error) {
        throw new Error('Error updating Session: ' + error.message);
    }
}


const deleteSession = async (sessionId) => {
    try {
        const deletedSession = await Session.findOneAndUpdate({
            _id: sessionId
        }, {
            deleted_at: new Date()
        }, {
            new: true
        });
        return deletedSession
    } catch (error) {
        throw new Error('Error updating Session: ' + error.message);
    }
}








// ---------------------------CLIENT FUNCTIONS------------------------



const getClientSessions = async () => {
    try {
        const sessions = await Session.find({
            deleted_at: null
        });

        const validSessions = [];
        const currentTime = moment();

        for (let session of sessions) {
            const sessionTime = moment(session.displayTime);

            if (currentTime.isBefore(sessionTime)) {
                validSessions.push(session);
            }
        }

        return validSessions;

    } catch (error) {
        throw new Error('Error fetching Sessions: ' + error.message);
    }
}


 














module.exports = {
    createSession,
    getAdminSessions,
    editSession,
    updateSession,
    deleteSession
}