const Reservation = require('../model/ReservationModel')
const Session = require('../model/SessionModel.js');



const createReservation = async (reservationData) => {
    try {
        //create Reservation
        const reservation = new Reservation(reservationData);
      return await reservation.save();
       
    } catch (error) {
        throw new Error('Error saving reservation: ' + error.message);
    }
}


const checkAvailableSeats = async (sessionId, requestedSeats) => {
    const existingReservations = await Reservation.find({
        session: sessionId
    });

    const reservedSeats = existingReservations.flatMap(reservation => reservation.seat);

    const alreadyTakenSeats = requestedSeats.filter(seat => reservedSeats.includes(seat));

    return alreadyTakenSeats;
};


const reservSession = async (sessionId) => {
    try {
        const sessionData = await Session.findById(sessionId);

        if (!sessionData) {
            throw new Error('Session not found');
        }

        return sessionData;
    } catch (error) {
        throw new Error('Error fetching session: ' + error.message);
    }
}



const clientReservations = async (clientId) => {
    try {
        const reservations = await Reservation.find({
            client: clientId,
        });

        return reservations
    } catch (error) {
        throw new Error('Error fetching reservations: ' + error.message);


    }
}
const getReservation = async (reservId) => {


    try {
        const reservation = await Reservation.findOne({
            _id: reservId,
            deleted_at: null
        })
        .populate({
            path: 'session',
            populate: [
                {
                    path: 'room',
                    select: 'name room_type' 
                },
                {
                    path: 'movie', 
                    select: 'name'
                }
            ]
        });
        
        return reservation;
    } catch (error) {
        throw new Error('Error fetching reservation: ' + error.message);
    }
}


const updateReserv = async (reservId, reservationData) => {
    try {
        const updatedReserv = await Reservation.findOneAndUpdate({
                _id: reservId
            },
            reservationData, {
                new: true
            });
        return updatedReserv
    } catch (error) {
        throw new Error('Error updating reservation : ' + error.message);
    }
}


const cancelReserv = async (reservId) => {

    try {
        const cancledReserv = Reservation.findOneAndUpdate({
            _id: reservId
        }, {
            deleted_at: new Date()
        }, {
            new: true
        });
        return cancledReserv
    } catch (error) {
        throw new Error('Error deleting reservation: ' + error.message);

    }
}



module.exports = {
    createReservation,
    checkAvailableSeats,
    reservSession,
    clientReservations,
    getReservation,
    updateReserv,
    cancelReserv
}