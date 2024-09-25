const reservationService = require("../service/ReservationService");
const {
    UserId
} = require('../helpers/helpers');


const createReservation = async (req, res) => {
    try {
        const {
            seat,
            session
        } = req.body;
        let userId = UserId(req);

        const sessionData = await reservationService.sessionReserv(session);
        const seatPrice = sessionData.price;

        const totalPrice = seat.length * seatPrice;

        const reservation = await reservationService.createReservation({
            seat,
            client: userId,
            session,
            totalPrice
        });

        res.status(201).json({
            message: "Reservation created successfully",
            data: reservation
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Failed to create reservation',
            error: error.message
        });
    }
};


const clientReservations = async (req, res) => {

    try {

        let id = UserId(req)
        const reservations = await reservationService.clientReservations(id);

        res.status(200).json({
            success: true,
            reservations: reservations
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}


const cancelReserv = async (req, res) => {
    try {
      const {
        id
      }   = req.params
        
        const cancledReserv = await reservationService.cancelReserv(id);
        if (!cancledReserv) {
            return res.status(404).send("reservation not found")

        }
        res.status(200).json({
            message: "reservation cancled succesfully",
            data: cancledReserv
        })
    } catch (error) {
        console.error("error deleting reservation", error)

        res.status(500).json({
            message: "Failed to delete reservation",
            error: error.message
        })
    }

}


module.exports = {
    createReservation,
    clientReservations,
    cancelReserv
}