const express = require('express');
const router = express.Router();
const reservationController = require('../controller/ReservationController')
const clientController = require('../controller/ClientController')






// ----------------------------  CRUD reservation  --------------------------
router.post("/reservation/create",reservationController.createReservation)
router.get("/reservations",reservationController.clientReservations)
router.get("/reservation/:id",reservationController.getReservation)
router.put("/reservation/update/:id",reservationController.updateReserv)
router.put("/reservation/cancel/:id",reservationController.cancelReserv)
// ----------------------------  CRUD reservation  --------------------------


// --------------------Client Page---------------------
router.get("/",clientController.getClient)
// --------------------Client Page---------------------


module.exports = router;