const express = require('express');
const router = express.Router();
const sessionController = require('../controller/SessionController')
const MovieController = require('../controller/MovieController')










// ------------------Sessions Display---------------
router.get("/sessions",sessionController.getUpcomingSessions)
router.get("/session/:id",sessionController.getSessionDetails)
router.get("/movie/sessions/:id",sessionController.getMovieSessions)
router.get("/movie/:id",MovieController.getMovie)


module.exports = router;