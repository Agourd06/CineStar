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


const getAllSessions = async () => {
    try {
        const sessions = await Session.find({
            deleted_at: null
        });

        return sessions;
    } catch (error) {
        throw new Error('Error fetching rooms: ' + error.message);
    }
}







// -----------------Code for update status of sessios-----------------
const updateAllSessionsStatus = async () => {
    const currentTime = moment();

    const sessions = await Session.find({ deleted_at: null });

    for (let session of sessions) {
        const sessionTime = moment(session.displayTime);

        if (currentTime.isBefore(sessionTime)) {
            session.status = 'upcoming';
        } else if (currentTime.isSameOrAfter(sessionTime)) {
            session.status = 'completed';
        }

        await session.save(); 
    }

    return sessions; 
};

// -----------------Code for update status of sessios-----------------


module.exports = {
    createSession,
    updateAllSessionsStatus,
    getAllSessions
}