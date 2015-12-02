(function () {

    angular.module('mrbs-tablet').service('WS', Ws);

    Ws.$inject = ['ROOM_ID'];

    function Ws( ROOM_ID) {

        var socket = io(location.protocol + '//' + location.hostname + ':' + location.port, { forceNew: true });



        return {
            getWs: function () {

                return socket;
            }
        }

    }
})();
