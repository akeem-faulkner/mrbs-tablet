(function () {

    angular.module('mrbs-tablet').service('Room', Room);

    Room.$inject = ['$http', 'ROOM_ID'];

    function Room($http, ROOM_ID) {

        return {
            getRoom: function (id) {
                return $http.get('/room/?id=' + ROOM_ID);
            }
        }

    }
})();
