(function () {

    var cacheBookings,
        cache;

    angular.module('mrbs-tablet').controller('bookingsCtrl', bookingsCtrl);

    bookingsCtrl.$inject = ['$scope', 'Bookings', '$interval', '$timeout', 'toaster', 'WS', 'ROOM_ID'];

    function bookingsCtrl($scope, Bookings, $interval, $timeout, toaster, WS, ROOM_ID) {

        var rangeLimit = 9;

        var startTime = moment().startOf('day').subtract(GLOB.subtract, 'minutes').format('X'),
            endTime = moment().add(24, 'hours').subtract(GLOB.subtract, 'minutes').format('X');

        var socket = WS.getWs();

        var vm = this;

        $scope.bookingForm = {};

        vm.showBookingForm = false;
        vm.bookingFormData = null;
        vm.bookingInfo = null;

        vm.createBooking = createBooking;
        vm.getBookingSlot = getBookingSlot;
        vm.hideBookingForm = hideBookingForm;
        vm.formatDate = formatDate;

        Bookings.getBookings(startTime, endTime, 30, rangeLimit).then(function (data) {

            vm.bookings = data;

            vm.isCurrentBooking = getCurrentBooking(vm.bookings);

            $('.loader')
                .delay(500)
                .fadeOut(500);

        });


        socket.on('connect', socketFunc);
        socket.on('reconnect', socketFunc);


        function socketFunc() {

            socket.emit('addToRoom', ROOM_ID);

            socket.on('newBookingData', function (data) {
                var serverBookings = Bookings.formatBookingList(JSON.parse(data), 30, rangeLimit);

                if (data != cache || (cacheBookings && cacheBookings.length && cacheBookings[0].time != serverBookings[0].time)) {

                    console.log('New data for room: ' + ROOM_ID);

                    cache = data;

                    cacheBookings = Bookings.formatBookingList(JSON.parse(cache), 30, rangeLimit);

                    vm.bookings = serverBookings;

                    vm.isCurrentBooking = getCurrentBooking(vm.bookings);

                    $scope.$apply();
                }


            });

        }

        $interval(function () {

            vm.isCurrentBooking = getCurrentBooking(vm.bookings);
            vm.nextBooking = getNextBooking(vm.bookings);

        }, 1000);

        function getNextBooking(bookings) {

            var nextBooking = false;

            for (var i = 0; i < bookings.length; i++) {
                if (bookings[i].data) {
                    nextBooking = bookings[i];
                    break;
                }
            }

            return nextBooking;
        }

        function getCurrentBooking(bookings) {

            var ra;
            var isBooking = false;

            for (var i = 0; i < bookings.length; i++) {
                if (bookings[i].data) {
                    ra = moment.range(bookings[i].data.from, bookings[i].data.to);
                    if (ra.contains(moment())) {
                        isBooking = bookings[i];
                        break;
                    }

                }

            }

            return isBooking;
        }


        function createBooking() {

            var newBooking;
            var startTime;
            var endTime;

            if ($scope.bookingForm.$valid) {

                $(".booking-form button").prop("disabled", true);

                startTime = moment(vm.bookingFormData.date, ['H:mm DD-MM-YYYY']).format('X');
                endTime = moment(vm.bookingFormData.date, ['H:mm DD-MM-YYYY']).add(30, 'minutes').format('X');
                newBooking = {
                    meetingNotes: $scope.bookingForm.employeeName,
                    name: $scope.bookingForm.meetingName,
                    startTime: startTime,
                    endTime: endTime,
                    room: ROOM_ID
                };

                var data = {"meetingNotes": "sdfsd", "name": "sdfsdfvvv", "startTime": "1448926200", "endTime": "1448928000", "room": "9"};

                Bookings.createBooking(newBooking).then(function (data) {

                    var message = "Booking: '" + data.name + "'  has been confirmed for "
                        + moment(data.startTime * 1000).format('H:mm');

                    toaster.pop({
                        type: 'success',
                        title: 'Success',
                        body: message,
                        showCloseButton: true
                    });

                    hideBookingForm();

                }, function (error) {
                    var errorInfo = JSON.parse(error.data.global[0]);
                    var conflict = errorInfo.conflicts[0];
                    var message = "Sorry a '"
                        + errorInfo.reason
                        + "' has occurred with "
                        + conflict.name + " at "
                        + moment(conflict.startTime * 1000).format('H:mm');

                    toaster.pop({
                        type: 'error',
                        title: 'Error',
                        body: message,
                        showCloseButton: true
                    });
                })
            }


        }

        function getBookingSlot(index) {

            if (typeof vm.bookings[index].data == 'undefined') {

                vm.bookingFormData = vm.bookings[index];

                $('.booking-form form').on('click.initial', function () {
                    $(document).scrollTop($('.booking-form form').offset().top);
                    $(this).off('click.initial');
                });

                $timeout(function () {
                    vm.showBookingForm = true;

                }, 300);

            } else {
                vm.bookingInfo = vm.bookings[index];

                if (vm.bookingInfoTimout) {
                    $timeout.cancel(vm.bookingInfoTimout);
                }

                vm.bookingInfoTimout = $timeout(function () {
                    vm.bookingInfo = null;
                }, 5000);

            }

        }

        function hideBookingForm() {
            $scope.bookingForm.employeeName = null;
            $scope.bookingForm.meetingName = null;
            $scope.bookingForm.$setPristine();
            vm.showBookingForm = false;
            vm.bookingFormData = null;

            document.activeElement.blur();
            $("input").blur();

            setTimeout(function () {

                $(".booking-form button").prop("disabled", false);

            }, 300);

        }

        function formatDate(date, format) {
            var _format = format || 'H:mm';
            if (date) {
                return date.format(_format);
            }
        }

    }


})();


