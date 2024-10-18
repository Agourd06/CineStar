const sessionService = require('../service/SessionService')
const reservationService = require('../service/ReservationService')
const movieService = require('../service/MovieService')
const roomService = require('../service/RoomService')
const { createSessionSchema ,
    updateSessionSchema} = require('../validations/SessionValidations')

const createSession = async (req, res) => {
    try {

        const { error } = createSessionSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                message: error.details[0].message
            });
        }
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
        console.log("yooo");
        const { page = 1, limit = 5 } = req.query;
        
        const sessions = await sessionService.getAdminSessions(Number(page), Number(limit))
        const movies = await movieService.getMovies()
        const rooms = await roomService.getRooms()

        
        res.status(200).json({
            success: true,
            sessions: sessions,
            movies: movies,
            rooms: rooms
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}



const getSession = async (req, res) => {
    try {
        const {
            id
        } = req.params
        const reservedSeats = await reservationService.getReservedSeats(id);

        const Session = await sessionService.getSession(id);

        res.status(200).json({
            success: true,
            data: Session,
            reservedSeats : reservedSeats
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

        const { error } = updateSessionSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                message: error.details[0].message
            });
        }
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


// --------------client Session--------------------

const searchSessions = async (req, res) => {
    try {
        const movieName = req.query.movieName;  
        
        const upcomingSessions = await sessionService.searchSessions(movieName); 
        console.log(upcomingSessions);
        
        return res.status(200).json(upcomingSessions); 
    } catch (error) {
        console.error(error.message); 
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};




const getUpcomingSessions = async (req, res) => {
    try {
        const upcomingSessions = await sessionService.getClientSessions(); 
        return res.status(200).json(upcomingSessions); 
    } catch (error) {
        console.error(error.message); 
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};



const getSessionDetails = async (req, res) => {
    try {

        const {
            id
        } = req.params
        const Session = await sessionService.getSessionDetails(id);

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

const getMovieSessions = async (req, res) => {
    const {
        id
    } = req.params
    try {
        const upcomingSessions = await sessionService.getMovieSessions(id); 
        return res.status(200).json(upcomingSessions); 
    } catch (error) {
        console.error(error.message); 
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};





module.exports = {
    createSession,
    getAdminSessions,
    getSession,
    updateSession,
    deleteSession,
    getUpcomingSessions,
    getSessionDetails,
    getMovieSessions,
    searchSessions
}