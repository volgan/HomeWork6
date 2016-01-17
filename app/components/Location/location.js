(function() {
    /**
     * Location Module
     *
     * Description
     */
    angular
        .module('Location', [])
        .factory('LocationService', LocationService);
    LocationService.$inject = ['$http'];

    function LocationService($http) {
        return {
            getLocals: getLocals
        }

        function getLocals() {
            return $http.get('../data/location.json')
                .success(getComplete);
        }

        function getComplete(response) {
            return response;
        }
    }
})();
(function() {
    'use strict';
    /**
     *  Module
     *
     * Description
     */
    angular
        .module('Location')
        .controller('LocationController', LocationController);

    LocationController.$inject = ['LocationService'];

    function LocationController(LocationService) {
        var vm = this;
        var cities = [];
        vm.map = {};
        vm.markers = [];

        activated();

        function activated() {
            return getLocal();
        }

        function getLocal() {
            return LocationService.getLocals()
                .success(function(data) {
                    cities = data.cities;
                    callMap();
                })
        }

        function callMap() {
            var mapOptions = {
                center: new google.maps.LatLng(15.478477, 107.946518),
                zoom: 5,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            vm.map = new google.maps.Map(document.getElementById('map'), mapOptions);
            var infoWindow = new google.maps.InfoWindow();

            var createMarker = function(info) {

                var marker = new google.maps.Marker({
                    map: vm.map,
                    position: new google.maps.LatLng(info.lat, info.long),
                    title: info.name
                });
                marker.content = '<div class="infoWindowContent"><strong>Địa chỉ</strong>: ' + info.address + '<br><strong> Thời gian làm việc: </strong>' + info.timeWork + '<br> <strong>Website: </strong>' + info.website + '</div>';
                google.maps.event.addListener(marker, 'click', function() {
                    infoWindow.setContent('<p><strong>Tên cửa hàng: </strong>' + info.name + '  </p>' + marker.content);
                    infoWindow.open(vm.map, marker);
                });
                vm.markers.push(marker);
            }

            for (var i = 0; i < cities.length; i++){
                console.log(cities[i])
                createMarker(cities[i]);
            }
            vm.openInfoWindow = function(e, selectedMarker){
                e.preventDefault(); 
                google.maps.event.trigger(selectedMarker, 'click');
            }
        }
    }
})();
