function TimeSlotRange() {
}
TimeSlotRange.prototype.roundDown = function (date) {
    var time = +date.toDate();
    var halfHour = 30 * 60 * 1000;
    return moment(time - time % halfHour);
};


TimeSlotRange.prototype.getTimeRange = function (start, interval, limit, rangeObject) {

    var time;
    var range = [];
    var index = 0;
    var startRange;
    var endRange;
    var ra;

    if (!start || !interval) {
        return;
    }
    if (start.constructor.name != 'Moment') {
        throw new Error("start argument needs to be moment objects")
    }


    if (rangeObject) {
        time = this.roundToNearestHalfHour(start).subtract(30, 'minutes');

        startRange = this.roundToNearestHalfHour(rangeObject.start);
        endRange = this.roundToNearestHalfHour(rangeObject.end);
        ra = moment.range(startRange, endRange);

        while (endRange > time) {
            if (ra.contains(time)) {
                range.push({
                    time: time.format('H:mm'),
                    date: time.format('H:mm DD-MM-YYYY')
                });


            }
            time = time.add(interval, 'minutes');

            index++;


        }

    } else {

        time = this.roundDown(start);

        while (limit > index) {

            range.push({
                time: time.format('H:mm'),
                date: time.format('H:mm DD-MM-YYYY')
            });

            time = time.add(interval, 'minutes');

            index++;

        }
    }

    return range;

};

TimeSlotRange.prototype.roundToNearestHalfHour = function (time) {

    var date,
        nearest = 30;

    if (!time) {
        return;
    }
    if (time.constructor.name != 'Moment') {
        throw new Error("argument time needs to be moment objects")
    }
    date = time.toDate();
    var coeff = 1000 * 60 * nearest,
        rounded = new Date(Math.round(date.getTime() / coeff) * coeff);

    return moment(rounded);
};