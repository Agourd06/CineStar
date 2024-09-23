const express = require('express');
const router = express.Router();
const AdminController = require('../controller/AdminController');


router.post("/create",AdminController.createAdmin)
router.get("/admins",AdminController.getAdmins)


module.exports = router;