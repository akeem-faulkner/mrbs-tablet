(function(){
angular.module('mrbs-tablet').service('Bookings', Bookings);

    Bookings.$inject = ['$http', 'Restangular','ROOM_ID'];

    function Bookings($http, Restangular, ROOM_ID) {

        var Bookings = Restangular.all('entries');
        var timeSlotRange = new TimeSlotRange();

        function formatBookings(data) {
            var output = {};
            var booking;
            for (var i = 0; i < data.length; i++) {
                booking = data[i];
                output[booking.start_time] = {
                    originalData: booking,
                    from: moment(new Date(booking.start_time)),
                    to: moment(new Date(booking.end_time)),
                    name: booking.name
                };
            }
            return output;
        }

        return {
            getBookings: function (start, end, interval, limit) {
                var self = this;
                var data;
                return $http.get('/bookings/?after='+start+'&before='+end+'&room=' + ROOM_ID).then(function(res){
                    data = res.data;

                    return self.formatBookingList(data, interval, limit);
                });




            },
            formatBookingList : function(data, interval, limit) {

                var timeRange = timeSlotRange.getTimeRange(moment().subtract(GLOB.subtract, 'minutes'), interval, limit);

                var output = this.mergeToTimeRange(formatBookings(data.data), timeRange, interval, limit);

                return output;

            },
            createBooking: function (booking) {
                return Bookings.post({
                    "entry": booking
                });
            },
            mergeToTimeRange: function (bookings, timeRange, interval, limit) {

                var booking, i, range, formatedBookings = [];
                for (i in bookings) {
                    booking = bookings[i];

                    range = timeSlotRange.getTimeRange(moment(), interval, limit, {
                        end: booking.to,
                        start: booking.from
                    });

                    for(var j = 0; j <range.length; j++) {

                        range[j].data = booking;
                        range[j].data.to = moment(range[j].time, ['H:mm']).add(30, 'minutes');


                    }

                    formatedBookings = formatedBookings.concat(range);

                }

                for(var k = 0; k < timeRange.length; k++) {
                    for(var l = 0; l < formatedBookings.length; l++) {
                        if(timeRange[k].time == formatedBookings[l].time) {
                            timeRange[k] = formatedBookings[l];
                        }
                    }
                }

                return timeRange;

            }
        }
    }
})();

