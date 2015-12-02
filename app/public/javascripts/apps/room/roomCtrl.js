(function(){
    function roomCtrl(Room) {
       var vm = this;

            Room.getRoom(1).then(function(data){
                vm.room = data.data;
            }, function(error){

            })
    }
    roomCtrl.$inject = ['Room'];
    angular.module('mrbs-tablet').controller('roomCtrl', roomCtrl);
})();
