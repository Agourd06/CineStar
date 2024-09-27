const reservationService = require("../service/ReservationService");
const mailerService = require("../service/ReservMailerService");
const {
    createReservationSchema,
    updateReservationSchema
} = require("../validations/ReservationValidations");
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

        const {
            error
        } = createReservationSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                message: error.details[0].message
            })
        }

        // Checking if seat reserved already exist or not
        const alreadyTakenSeats = await reservationService.checkAvailableSeats(session, seat);

        if (alreadyTakenSeats.length > 0) {
            return res.status(400).json({
                message: "there is Some taken seat chosed please check again for avaibility",
                takenSeats: alreadyTakenSeats
            });
        }

        // Calculate The price of reservations
        const sessionData = await reservationService.reservSession(session);
        const seatPrice = sessionData.price;
        const totalPrice = seat.length * seatPrice;

        //create the resrvation
        const reservation = await reservationService.createReservation({
            seat,
            client: userId,
            session,
            totalPrice
        });

        await mailerService.sendReservationEmail("agourdahmedamine96@gmail.com", reservation);

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

const getReservation = async (req, res) => {
    try {

        const {
            id
        } = req.params
        const reservation = await reservationService.getReservation(id);

        res.status(200).json({
            success: true,
            data: reservation
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

const updateReserv = async (req, res) => {
    try {
        const {
            id
        } = req.params


        const {
            error
        } = updateReservationSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                message: error.details[0].message
            });
        }

        const {
            seat,
            session
        } = req.body;


        // Calculate The price of reservations
        const sessionData = await reservationService.reservSession(session);
        const seatPrice = sessionData.price;
        const totalPrice = seat.length * seatPrice;

        const updatedReserv = await reservationService.updateReserv(id, {
            seat,
            session,
            totalPrice
        })
        if (!updatedReserv) {
            return res.status(404).send("reservation not found")

        }
        res.status(200).json({
            message: "reservation updated successfully",
            data: updatedReserv
        })
    } catch (error) {
        console.error("error deleting reservation", error)

        res.status(500).json({
            message: "Failed to delete reservation",
            error: error.message
        })
    }
}


const cancelReserv = async (req, res) => {
    try {
        const {
            id
        } = req.params

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
    getReservation,
    updateReserv,
    cancelReserv
}