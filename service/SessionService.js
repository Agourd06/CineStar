const MovieModel = require('../model/MovieModel.js');
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


const getAdminSessions = async (page = 1, limit = 5) => {
    try {
        const skip = (page - 1) * limit;
        const sessions = await Session.find({
                deleted_at: null
            })
            .populate('movie', 'name image')
            .populate('room', 'name')
            .skip(skip)
            .sort({
                createdAt: -1
            })
            .limit(limit);

        return sessions;
    } catch (error) {
        throw new Error('Error fetching Sessions: ' + error.message);
    }
}

const getSession = async (sessionId) => {


    try {
        const session = await Session.findOne({
            _id: sessionId,
            deleted_at: null
        }).populate('room', 'capacity');;
        return session;
    } catch (error) {
        throw new Error('Error fetching Session: ' + error.message);
    }
}
const getSessionOfRoom = async (roomId) => {


    try {
        const session = await Session.findOne({
            room: roomId,
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
            }).populate('movie' , 'name').populate('room','name')
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

const searchSessions = async (movieName) => {
    try {
        const query = {
            deleted_at: null
        };

        const movies = await MovieModel.find({
            name: {
                $regex: movieName,
                $options: 'i'
            },
            deleted_at : null
        });

        if (movies.length === 0) {
            return [];
        }



        return movies;

    } catch (error) {
        throw new Error('Error fetching sessions: ' + error.message);
    }
};






const getClientSessions = async () => {
    try {
        const sessions = await Session.find({
                deleted_at: null
            })
            .populate('movie', 'name image duration description')
            .populate('room', 'name');

        const upcomingSessions = [];
        const uniqueMovieIds = new Set();
        const currentTime = moment();

        for (let session of sessions) {
            const sessionTime = moment(session.displayTime);

            if (currentTime.isBefore(sessionTime) && !uniqueMovieIds.has(session.movie._id)) {
                upcomingSessions.push(session);
                uniqueMovieIds.add(session.movie._id);
            }
        }


        return upcomingSessions;

    } catch (error) {
        throw new Error('Error fetching Sessions: ' + error.message);
    }
}
const getMovieSessions = async (id) => {
    try {
        const sessions = await Session.find({
                deleted_at: null,
                movie: id

            })
            .populate('movie', 'name media duration description')
            .populate('room', 'name');

        const upcomingSessions = [];

        const currentTime = moment();

        for (let session of sessions) {
            const sessionTime = moment(session.displayTime);
            if (currentTime.isBefore(sessionTime)) {
                upcomingSessions.push(session);
            }
        }


        return upcomingSessions;

    } catch (error) {
        throw new Error('Error fetching Sessions: ' + error.message);
    }
}

const getSessionDetails = async (sessionId) => {
    try {
        const session = await Session.findOne({
                _id: sessionId,
                deleted_at: null
            })
            .populate('movie', 'name media duration description')
            .populate('room', 'name');

        if (!session) {
            throw new Error('Session not found');
        }

        const currentTime = moment();
        const sessionTime = moment(session.displayTime);

        if (currentTime.isBefore(sessionTime)) {
            return session;
        }

        return "This session isn't disponible anymore";
    } catch (error) {
        throw new Error('Error fetching Session: ' + error.message);
    }
}








module.exports = {
    createSession,
    getAdminSessions,
    getSession,
    updateSession,
    deleteSession,
    getClientSessions,
    getSessionDetails,
    getMovieSessions,
    getSessionOfRoom,
    searchSessions
}