const express = require('express');
const router = express.Router();
const AdminController = require('../controller/AdminController');
const MovieController = require('../controller/MovieController');

//------------------------ Admins CRUD------------------------
router.post("/create",AdminController.createAdmin)
router.get("/admins",AdminController.getAdmins)
router.put("/update/:id",AdminController.updateAdmins)
router.put("/delete/:id",AdminController.softDeleteAdmins)
//------------------------ Admins CRUD------------------------




//------------------------ Movie CRUD------------------------
router.post("/movie/create",MovieController.createMovie)
router.get("/movies",MovieController.getAllMovies)
router.put("/movie/update/:id",MovieController.updateMovie)
router.put("/movie/delete/:id",MovieController.deleteMovie)
//------------------------ Movie CRUD------------------------



//------------------------ Room CRUD------------------------
// router.post("/room/create",RoomController.createroom)
// router.get("/rooms",RoomController.getAllrooms)
// router.put("/room/update/:id",RoomController.updateroom)
// router.put("/room/delete/:id",RoomController.deleteroom)
//------------------------ Room CRUD------------------------



module.exports = router;