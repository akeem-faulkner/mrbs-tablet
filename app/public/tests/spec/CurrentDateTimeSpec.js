describe("DateTime Constructor", function() {
  var dateTime;

  beforeEach(function() {
    dateTime = new DateTime();
  });

  it("should output the current date in the format of 'MMMM Do' on the method getCurrentDate()", function() {
    expect(dateTime.getCurrentDate()).toEqual(moment().format('MMMM Do'));
  });

  it("should output the current hour on the method getCurrentHour()", function() {
    expect(dateTime.getCurrentHour()).toEqual(moment().format('H'));
  });

  it("should output the current minutes on the method getCurrentMinutes()", function() {
    expect(dateTime.getCurrentMinutes()).toEqual(moment().format('mm'));
  });
});
