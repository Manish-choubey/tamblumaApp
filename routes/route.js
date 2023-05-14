const express = require('express');
const router = express.Router();

const usercontroller = require("../controller/usercontroller")
const ticketcontroller = require('../controller/ticketcontroller')

router.post('/register',usercontroller.createUser)
router.post('/login',usercontroller.LoginUsr)
router.post('/creat',ticketcontroller.createdTicket)
router.get('/ticket/:id',ticketcontroller.fetchticket)






module.exports = router;