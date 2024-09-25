const Reservation = require('../model/ReservationModel')
const Session = require('../model/SessionModel.js');



const createReservation = async (reservationData) => {
    try {
        const reservation = new Reservation(reservationData);
        return await reservation.save();
    } catch (error) {
        throw new Error('Error saving reservation: ' + error.message);
    }
}

const sessionReserv = async (sessionId) => {
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
        })

        return reservations
    } catch (error) {
        throw new Error('Error fetching reservations: ' + error.message);


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
    clientReservations,
    sessionReserv,
    cancelReserv
}