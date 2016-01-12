(function(){
    /**
    *  Module
    *
    * Description
    */
    angular
        .module('LaptopController')
        .factory('LaptopDetailservice', LaptopDetailservice);

        LaptopDetailservice.$inject = ['$http', '$stateParams'];
        function LaptopDetailservice ($http,$stateParams) {
            return {
                getLaptops : getLaptops
            }
            function getLaptops () {
                return $http.get('../data/laptops/'+$stateParams.LaptopId+'.json')
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
        .controller('LaptopDetailController', LaptopDetailController);

    LaptopDetailController.$inject = ['$scope', 'LaptopDetailservice'];

    function LaptopDetailController($scope,LaptopDetailservice) {
        var vm = this;
        vm.Laptops = {};
        vm.price = "price";
        
        activated();
        function activated(){
            return getLaptop();
        }

        function getLaptop(){
            return LaptopDetailservice.getLaptops()
                .success(function(data){
                    vm.Laptops = data;
                });
        }
    }

})();
