const express = require('express');
const router = express.Router();
const sessionController = require('../controller/SessionController')










// ------------------Sessions Display---------------
router.get("/sessions",sessionController.getUpcomingSessions)
router.get("/session/:id",sessionController.getSessionDetails)

module.exports = router;