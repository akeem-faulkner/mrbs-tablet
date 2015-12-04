var GLOB = {
    subtract: 0
};
(function () {
    var queryArray = location.search.substr(1).split('&');
    var query = {};

    queryArray.forEach(function (val) {
        var q = val.split('=');
        query[q[0].toLocaleLowerCase()] = q[1];

    });

    var apiKey = query['token'];
    var roomId = query['roomid'];

    angular.module('mrbs-tablet', ['restangular', 'toaster', 'ngTouch', 'ngAnimate'])
        .config(AppConfig)
        .constant('API_KEY', apiKey)
        .constant('ROOM_ID', roomId);

    angular.element(document).ready(function () {
        angular.bootstrap(document, ['mrbs-tablet']);
        $(document).foundation();
    });

    AppConfig.$inject = ['RestangularProvider'];

    function AppConfig(RestangularProvider) {

        //restangular config
        RestangularProvider.setBaseUrl(API_HOST);
        RestangularProvider.setRequestSuffix('.json');

        //set the api request headers for api calls
        RestangularProvider.setDefaultHeaders({
            "X-Requested-With": "XMLHttpRequest",
            "X-Lowe-Api": apiKey,
            "Content-Type": "application/json"
        });


    }

})();

$(document).ready(function () {

    setTimeout(function () {
        window.location.reload();
    }, 1.8e+6);

    $('.button-default').on('click', buttonEffect);
    $('.button-default').on('touchend', buttonEffect);
    function buttonEffect(e) {

        var $this = $(this);
        var effect = document.createElement('span');
        var x, y;

        effect.className = 'effect-click';

        if (e.type == 'click') {
            if(! e.delegateTarget) {
                x = e.offsetX + 'px';
                y = e.offsetY + 'px';
            }
        } else {
            x = e.originalEvent.changedTouches[0].pageX - $this.offset().left;
            y = e.originalEvent.changedTouches[0].pageY - $this.offset().top;
        }

        effect.style.left = x;
        effect.style.top = y;
        $this.append(effect);

        setTimeout(function () {
            effect.parentNode.removeChild(effect);
        }, 1000);


    }
});