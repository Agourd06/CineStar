const express = require('express');
const router = express.Router();
const reservationController = require('../controller/ReservationController')






// ----------------------------  CRUD reservation  --------------------------
router.post("/reservation/create",reservationController.createReservation)
router.get("/reservations",reservationController.clientReservations)
router.put("/reservation/cancel/:id",reservationController.cancelReserv)
// ----------------------------  CRUD reservation  --------------------------


module.exports = router;