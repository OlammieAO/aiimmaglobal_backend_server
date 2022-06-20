const express = require('express');
const controller = require('../controllers/greetme');
const router = express.Router();

router.get('/greetme', controller.getGreetMe);

module.exports = router;
