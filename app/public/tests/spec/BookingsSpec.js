describe("Bookings Service", function () {

    var bookings;

    beforeEach(function () {
        bookings = new Bookings();
    });

    describe("getBookings()", function () {
        it("should return an object to not be undefined", function () {
            var result = bookings.getBookings(30, 10);
            expect(result).not.toBeUndefined();

        });

        it("should return a merged object of booking and time range", function () {
            spyOn(bookings, 'mergeToTimeRange');


            bookings.getBookings(30, 10);
            expect(bookings.mergeToTimeRange).toHaveBeenCalled();


        });
    });



});

