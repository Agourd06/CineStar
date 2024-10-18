const express = require('express');
const router = express.Router();
const reservationController = require('../controller/ReservationController')
const clientController = require('../controller/ClientController')
const roomController = require('../controller/RoomController')
const sessionController = require('../controller/SessionController')
const CommentController = require('../controller/CommentController')






// ----------------------------  CRUD reservation  --------------------------
router.post("/reservation/create/:id",reservationController.createReservation)
router.get("/reservations",reservationController.clientReservations)
router.get("/reservation/:id",reservationController.getReservation)
router.put("/reservation/update/:id",reservationController.updateReserv)
router.put("/reservation/cancel/:id",reservationController.cancelReserv)
// ----------------------------  CRUD reservation  --------------------------


// --------------------Client Page---------------------
router.get("/",clientController.getClient)
// --------------------Client Page---------------------

// --------------------Room Page---------------------
router.get("/room/:id",roomController.getRoom)
// --------------------Room Page---------------------

// --------------------Sessions Page---------------------
router.get("/session/:id",sessionController.getSession)
// --------------------Sessions Page---------------------


// --------------------subscribe ---------------------
router.put("/subscribe",clientController.subscribe)
// --------------------subscribe---------------------

// --------------------Favorit ---------------------
router.post("/favorit/:movieId",clientController.manageFavoritMovie)
router.get('/isfavorit/:movieId', clientController.isFavorite);
router.get("/favorites",clientController.FavoritMovie)

// --------------------Favorit---------------------

// --------------------Rating ---------------------
router.post('/rate/:movieId', clientController.RatingMovie);
router.get('/rate/:movieId', clientController.getClientRating);

// --------------------Rating---------------------


// --------------------comment ---------------------
router.post("/comment/create",CommentController.createComment)
router.put("/comment/delete/:id",CommentController.deleteComment)

// --------------------comment---------------------


module.exports = router;