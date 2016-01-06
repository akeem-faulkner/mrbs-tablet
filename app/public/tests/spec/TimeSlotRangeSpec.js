describe("TimeSlotRange Constructor", function () {
    var timeSlotRange;

    beforeEach(function () {
        timeSlotRange = new window['mrbs-tablet']['utils']['TimeSlotRange']();
    });

    describe("roundToNearestHalfHour(time, nearest)", function () {
        it("should throw an error if the arguments start or end is not a moment object", function () {
            expect(function () {
                timeSlotRange.roundToNearestHalfHour(1, 2);
            }).toThrowError("argument time needs to be moment objects");
        });

        it("should return a moment object", function () {
            var result = timeSlotRange.roundToNearestHalfHour(moment());
            expect(result.constructor.name).toEqual('Moment');
        });

        it("should return a time with minutes rounded to '30' or '00'", function () {
            var result = timeSlotRange.roundToNearestHalfHour(moment());
            expect(result.format('mm')).toMatch(/30|00/);
        });
    });


    describe("getTimeRange(start, interval, limit)", function () {
        it("should throw an error if the arguments start or end is not a moment object", function () {
            expect(function () {
                timeSlotRange.getTimeRange(1, 2, 3);
            }).toThrowError("start argument needs to be moment objects");
        });

        it("should return 10 array Elements", function () {

            var results = timeSlotRange.getTimeRange(moment(), 30, 10);

            expect(results.length).toEqual(10);

        });

        it("should return time slots to end time if the rangeObject argument is present", function () {

            var start = moment();
            var end = moment().add(1, 'hour');

            var results = timeSlotRange.getTimeRange(start, 30, 10, {start:start, end: end});
            expect(results[results.length - 1].time).toEqual(timeSlotRange.roundToNearestHalfHour(end).subtract(30, 'minutes').format('H:mm'));

        });
    });

});
