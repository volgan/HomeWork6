(function(){
    /**
    *  Module
    *
    * Description
    */
    angular
        .module('Home', [])
        .factory('dataservice', dataservice);

        dataservice.$inject = ['$http'];
        function dataservice ($http) {
            return {
                getphones : getphones,
                getLaptops : getLaptops,
                getTablets : getTablets,
            }
            function getphones () {
                return $http.get('../data/phones/phones.json')
                    .success(getphoneComplete);
            }
            function getphoneComplete (response) {
                return response.data;
            }
            function getTablets () {
                return $http.get('../data/tablets/tablets.json')
                    .success(getTabletComplete);
            }
            function getTabletComplete (response) {
                return response.data;
            }
            function getLaptops () {
                return $http.get('../data/laptops/laptops.json')
                    .success(getphoneComplete);
            }
            function getphoneComplete (response) {
                return response.data;
            }
        }
})();

(function() {
    /**
     *  Module
     *
     * Description
     */
    angular.module('Home')
        .controller('MainController', MainController)
        .animation('.slide-animation', slideAnimation)

    MainController.$inject = ['$scope','dataservice'];

    function MainController($scope,dataservice) {
        var vm = this;
        vm.direction = 'left';
        vm.currentIndex = 0;
        vm.phones = [];
        vm.tablets = [];
        vm.Laptops = [];
        vm.hide = [];
        vm.show = [];
        vm.showPhoneImage = showPhoneImage;
        vm.hidePhoneImage = hidePhoneImage;
        vm.setCurrentSlideIndex = setCurrentSlideIndex;
        vm.isCurrentSlideIndex = isCurrentSlideIndex;
        vm.prevSlide = prevSlide;
        vm.nextSlide = nextSlide;
        vm.slides = [{
            image: '../images/img/image1.jpg',
            description: 'Mua hàng trả vàng'
        }, {
            image: '../images/img/image2.jpg',
            description: 'Apple watch sắp ra mắt'
        }, {
            image: '../images/img/image3.jpg',
            description: 'Samsug đón tết lái Mercedes'
        }, {
            image: '../images/img/image4.jpg',
            description: 'Galaxy A5 đón tết, chào năm mới'
        }, {
            image: '../images/img/image5.jpg',
            description: 'Iphone 6s: Lì xì đến 18 triệu'
        }, {
            image: '../images/img/image6.jpg',
            description: 'Đại tiệc trả góp OPPO'
        }];

        ///////////////////////////////////////////////////////////


        activated_Phone();
        function activated_Phone(){
            return getPhone();
        }

        function getPhone (){
            return dataservice.getphones()
                .success(function(data){
                    vm.phones = data;
                });
        }
        activated_Tablet();
        function activated_Tablet(){
            return getTablet();
        }

        function getTablet (){
            return dataservice.getTablets()
                .success(function(data){
                    vm.tablets = data;
                });
        }
        activated_Laptop();
        function activated_Laptop(){
            return getLaptops();
        }

        function getLaptops (){
            return dataservice.getLaptops()
                .success(function(data){
                    vm.Laptops = data;
                });
        }
        for (var i = 0; i < 9; i++) {
            vm.hide[i] = {
                display: 'block'
            };
            vm.show[i] = {
                display: 'none'
            };
        };
        function showPhoneImage(id) {
            vm.hide[id] = {
                display: 'block'
            };
            vm.show[id] = {
                display: 'none'
            };
        }
        function hidePhoneImage(id) {
            vm.hide[id] = {
                display: 'none'
            };
            vm.show[id] = {
                display: 'block'
            };
        }
        

        function setCurrentSlideIndex (index) {
            vm.direction = (index > vm.currentIndex) ? 'left' : 'right';
            vm.currentIndex = index;
        };

        function isCurrentSlideIndex(index) {
            return vm.currentIndex === index;
        };

        function prevSlide() {
            vm.direction = 'left';
            vm.currentIndex = (vm.currentIndex < vm.slides.length - 1) ? ++vm.currentIndex : 0;
        };

        function nextSlide() {
            vm.direction = 'right';
            vm.currentIndex = (vm.currentIndex > 0) ? --vm.currentIndex : vm.slides.length - 1;
        };
    }

    function slideAnimation() {
        return {
            beforeAddClass: function(element, className, done) {
                var scope = element.scope();

                if (className == 'ng-hide') {
                    var finishPoint = element.parent().width();
                    if (scope.direction !== 'right') {
                        finishPoint = -finishPoint;
                    }
                    TweenMax.to(element, 0.5, {
                        left: finishPoint,
                        onComplete: done
                    });
                } else {
                    done();
                }
            },
            removeClass: function(element, className, done) {
                var scope = element.scope();

                if (className == 'ng-hide') {
                    element.removeClass('ng-hide');

                    var startPoint = element.parent().width();
                    if (scope.direction === 'right') {
                        startPoint = -startPoint;
                    }

                    TweenMax.fromTo(element, 0.5, {
                        left: startPoint
                    }, {
                        left: 0,
                        onComplete: done
                    });
                } else {
                    done();
                }
            }
        };
    }
})();
// (function() {
//     /**
//      *  Module
//      *
//      * Description
//      */
//     angular.module('MyApp')
//         .controller('DemoCtrl', DemoCtrl);

//     function DemoCtrl($timeout, $q, $log) {
//         var self = this;
//         self.simulateQuery = false;
//         self.isDisabled = false;
//         // list of `state` value/display objects
//         self.states = loadAll();
//         self.querySearch = querySearch;
//         self.selectedItemChange = selectedItemChange;
//         self.searchTextChange = searchTextChange;
//         self.newState = newState;

//         function newState(state) {
//             alert("Sorry! You'll need to create a Constituion for " + state + " first!");
//         }
//         // ******************************
//         // Internal methods
//         // ******************************
//         /**
//          * Search for states... use $timeout to simulate
//          * remote dataservice call.
//          */
//         function querySearch(query) {
//             var results = query ? self.states.filter(createFilterFor(query)) : self.states,
//                 deferred;
//             if (self.simulateQuery) {
//                 deferred = $q.defer();
//                 $timeout(function() {
//                     deferred.resolve(results);
//                 }, Math.random() * 1000, false);
//                 return deferred.promise;
//             } else {
//                 return results;
//             }
//         }

//         function searchTextChange(text) {
//             $log.info('Text changed to ' + text);
//         }

//         function selectedItemChange(item) {
//             $log.info('Item changed to ' + JSON.stringify(item));
//         }
//         /**
//          * Build `states` list of key/value pairs
//          */
//         function loadAll() {
//             var allStates = 'Samsung galaxy Tab, Nokia lumia, Iphone';
//             return allStates.split(/, +/g).map(function(state) {
//                 return {
//                     value: state.toLowerCase(),
//                     display: state
//                 };
//             });
//         }
//         /**
//          * Create filter function for a query string
//          */
//         function createFilterFor(query) {
//             var lowercaseQuery = angular.lowercase(query);
//             return function filterFn(state) {
//                 return (state.value.indexOf(lowercaseQuery) === 0);
//             };
//         }
//     }
// })();
