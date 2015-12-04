var io = require("socket.io")();
var request = require("request");
var moment = require("moment");
module.exports = function (app) {

    var rooms = [];
    var clients = [];

    app.io = io;

    app.io.on("connection", function (socket) {

        console.log('New client connected!');

        socket.on("addToRoom", function (data) {

            if (rooms.indexOf(data) < 0) {
                rooms.push(data);
            }
            if (clients.indexOf(socket.id) < 0) {
                clients.push(socket.id);
            }
            socket.join(data);
            setInterval(function () {
                for (var i = 0; i < rooms.length; i++) {
                    checkBookings(socket, rooms[i])
                }
            }, 2000);
        });

    });


    function checkBookings(socket, roomId) {
        var startTime = moment().startOf('day').format('X'),
            endTime = moment().add(24, 'hours').format('X');
        var appUrl = process.env.BASE_URL;
        request(appUrl + '/bookings/?after=' + startTime + '&before=' + endTime + '&room=' + roomId, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                socket.to(roomId).emit('newBookingData', body);
            }
        });
    }


};
