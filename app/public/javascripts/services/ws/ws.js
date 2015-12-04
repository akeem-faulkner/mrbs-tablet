(function () {

    angular.module('mrbs-tablet').service('WS', Ws);

    Ws.$inject = ['ROOM_ID'];

    function Ws( ROOM_ID) {

        var socket = io();



        return {
            getWs: function () {

                return socket;
            }

        }

    }
})();
