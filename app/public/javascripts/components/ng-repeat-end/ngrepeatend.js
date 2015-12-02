(function(){

    angular.module('mrbs-tablet').directive('ngRepeatEnd', ngRepeatend);
    ngRepeatend.$inject = ['$timeout']

    function ngRepeatend($timeout) {
        return {
            restrict: 'A',
            link: function (scope, element, attr) {
                if (scope.$last === true) {
                    $timeout(function () {
                        scope.$emit('ngRepeatFinished');
                    });
                }
            }
        }
    }
})();
