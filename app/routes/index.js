var express = require('express');

var router = express.Router();
var bookingsModel = require('../models/bookings');
var roomModel = require('../models/room');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {API_HOST: process.env.API_HOST});
});
/* GET home page. */
router.get('/bookings', bookingsModel);
router.get('/room', roomModel);

module.exports = router;
