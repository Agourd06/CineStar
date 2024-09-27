const express = require('express');
const router = express.Router();
const AdminController = require('../controller/AdminController');
const MovieController = require('../controller/MovieController');
const RoomController = require('../controller/RoomController');
const SessionController = require('../controller/SessionController');
const upload = require('../middleware/uploadMiddleWare')



//------------------------ Admins CRUD------------------------
router.post("/create",AdminController.createAdmin)
router.get("/admins",AdminController.getAdmins)
router.get("/:id",AdminController.getAdmin)
router.put("/update/:id",AdminController.updateAdmins)
router.put("/delete/:id",AdminController.softDeleteAdmins)
//------------------------ Admins CRUD------------------------




//------------------------ Movie CRUD------------------------
router.post("/movie/create",upload.single('media'),MovieController.createMovie)
router.get("/movies",MovieController.getAllMovies)
router.get("/movie/:id",MovieController.getMovie)
router.put("/movie/update/:id",MovieController.updateMovie)
router.put("/movie/delete/:id",MovieController.deleteMovie)
//------------------------ Movie CRUD------------------------



//------------------------ Room CRUD------------------------
router.post("/room/create",RoomController.createroom)
router.get("/rooms",RoomController.getAllRooms)
router.get("/room/:id",RoomController.getRoom)
router.put("/room/update/:id",RoomController.updateRoom)
router.put("/room/delete/:id",RoomController.deleteRoom)
//------------------------ Room CRUD------------------------




//------------------------ Session CRUD------------------------
router.post("/session/create",SessionController.createSession)
router.get("/sessions",SessionController.getAdminSessions)
router.get("/session/:id",SessionController.getSession)
router.put("/session/update/:id",SessionController.updateSession)
router.put("/session/delete/:id",SessionController.deleteSession)
//------------------------ Session CRUD------------------------



module.exports = router;