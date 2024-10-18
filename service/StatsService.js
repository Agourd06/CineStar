const Movie = require('../model/MovieModel.js');
const Session = require('../model/SessionModel.js');
const Reservation = require('../model/ReservationModel.js');
const User = require('../model/UserModel.js');





const getSessionsCount = async () => {
    try {
        const sessionsCount = await Session.find({
            deleted_at: null
        }).countDocuments(); 

        return sessionsCount;
    } catch (error) {
        throw new Error('Error fetching sessions: ' + error.message);
    }
};
const getReservationsCount = async () => {
    try {
        const reservationsCount = await Reservation.find({
            deleted_at: null
        }).countDocuments();

        return reservationsCount;
    } catch (error) {
        throw new Error('Error fetching reservations: ' + error.message);
    }
};
const getClientsCount = async () => {
    try {
        const clientsCount = await User.find({
            role: 'client',
            deleted_at: null
        }).countDocuments();

        return clientsCount;
    } catch (error) {
        throw new Error('Error fetching clients: ' + error.message);
    }
};
const getAdminsCount = async () => {
    try {
        const adminsCount = await User.find({
            role: 'admin',
            deleted_at: null
        }).countDocuments();

        return adminsCount;
    } catch (error) {
        throw new Error('Error fetching admins: ' + error.message);
    }
};
const getMoviesCount = async () => {
    try {
        const moviesCount = await Movie.find({
            deleted_at: null
        }).countDocuments();

        return moviesCount;
    } catch (error) {
        throw new Error('Error fetching movies: ' + error.message);
    }
};








module.exports = {
    getSessionsCount,
    getReservationsCount,
    getClientsCount,
    getAdminsCount,
    getMoviesCount
}