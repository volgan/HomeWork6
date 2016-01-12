(function(){
    /**
    *  Module
    *
    * Description
    */
    angular
        .module('LaptopController', [])
        .factory('Laptopservice', Laptopservice);

        Laptopservice.$inject = ['$http'];
        function Laptopservice ($http) {
            return {
                getLaptops : getLaptops
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
    angular
        .module('LaptopController')
        .controller('LaptopListController', LaptopListController);

    LaptopListController.$inject = ['$scope', 'Laptopservice'];

    function LaptopListController($scope,Laptopservice) {
        var vm = this;
        vm.Laptops = [];
        vm.price = "price";
        
        activated();
        function activated(){
            return getLaptop();
        }

        function getLaptop(){
            return Laptopservice.getLaptops()
                .success(function(data){
                    vm.Laptops = data;
                });
        }
        $scope.$watch("$scope.Laptops", function(newVal, OldVal){
            console.log("New Val: " + newVal),
            console.log("Old Val: " + OldVal)
        })
    }

})();
