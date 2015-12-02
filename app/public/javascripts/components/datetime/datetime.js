(function(){

    angular.module('mrbs-tablet').directive('dateTime', dateTime);
    dateTime.$inject = ['$interval']
    function dateTime($interval) {
        return {
            restrict: 'E',
            template: '<div class="date-time">\n    <div class="date-time__currentTime">\n        <span class="date-time__currentTime-hours">{{hours}}</span>:<span class="date-time__currentTime-mins">{{minutes}}</span>\n    </div>\n    <div class="date-time__currentDay">{{date}}</div>\n</div>',
            link : function(scope, iElement, iAttrs){

                var timer = new DateTime();
                scope.hours = timer.getCurrentHour();
                scope.minutes = timer.getCurrentMinutes();
                scope.date = timer.getCurrentDate();

                $interval(function(){
                    scope.hours = timer.getCurrentHour();
                    scope.minutes = timer.getCurrentMinutes();
                    scope.date = timer.getCurrentDate();
                }, 50);
                $(document).foundation('equalizer', 'reflow');
            }
        }
    }

    function DateTime() {
    }

    DateTime.prototype.getCurrentDate = function() {
        return moment().format('MMMM Do');
    };

    DateTime.prototype.getCurrentHour = function() {
        return moment().format('H');
    };

    DateTime.prototype.getCurrentMinutes = function() {
        return moment().format('mm');
    };


})();
