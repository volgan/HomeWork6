(function(){
    /**
    *  Module
    *
    * Description
    */
    angular
        .module('PhonesController', [])
        .factory('phoneservice', phoneservice);

        phoneservice.$inject = ['$http'];
        function phoneservice ($http) {
            return {
                getphones : getphones
            }
            function getphones () {
                return $http.get('../data/phones/phones.json')
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
    angular
        .module('PhonesController')
        .controller('PhoneListController', PhoneListController);

    PhoneListController.$inject = ['$scope', 'phoneservice'];

    function PhoneListController($scope,phoneservice) {
        var vm = this;
        vm.phones = [];
        vm.price = "price";
        
        activated();
        function activated(){
            return getPhone();
        }

        function getPhone (){
            return phoneservice.getphones()
                .success(function(data){
                    vm.phones = data;
                });
        }
    }

})();
