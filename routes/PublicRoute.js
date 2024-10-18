const express = require('express');
const router = express.Router();
const sessionController = require('../controller/SessionController')
const MovieController = require('../controller/MovieController')
const CommentController = require('../controller/CommentController')
const AdminController = require('../controller/AdminController')









router.get("/user",AdminController.getUser)


// ------------------Sessions Display---------------
router.get("/sessions",sessionController.getUpcomingSessions)
router.get("/search",sessionController.searchSessions)
router.get("/session/:id",sessionController.getSessionDetails)
router.get("/movie/sessions/:id",sessionController.getMovieSessions)
router.get("/movie/:id",MovieController.getMovie)

//-------------------Comment---------------------
router.get("/comments/:id",CommentController.getMovieComments)

module.exports = router;