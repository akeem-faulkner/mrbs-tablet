(function(){

    angular.module('mrbs-tablet').directive('bookingItem', bookingitem);

    function bookingitem() {
        return {
            restrict: 'E',
            replace: true,
            scope: {
              time: '='
            },
            template: '<li class="booking-list__item">\n    <span class="booking-list__item-time">{{time}}</span>\n</li>',
            compile: function(element, attributes) {
                return {
                    post: function(scope, iElement, attributes, controller, transcludeFn){
                        $(iElement).each(function () {
                            var paper = Raphael(this, $(this).width(), $(this).height());
                            var c = paper.path("M100,0c0,0-32,35-50,53S0,100,0,100h100");
                            c.attr("fill", "#333333");
                            c.attr("stroke-width", "0");


                            $(this).find('svg').css({
                                width: "130",
                                height: "130",
                                bottom: "5",
                                right: "10"
                            });

                            if (!$(this).hasClass('booking-list__item--active')) {
                                $(this).on('click', function () {
                                    c.animate({path: 'M100,0c0,0-14,47-32,65S0,100,0,100h100'}, 200, "elastic", function () {
                                        c.animate({path: 'M100,0c0,0-32,35-50,53S0,100,0,100h100'}, 1000, 'elastic');
                                    });
                                });
                            }


                        });


                    }
                }
            }
        }
    }



})();
