(function() {
    /**
     *  Module
     *
     * Description
     */
    angular
        .module('AccessoryController', [])
        .factory('phuKienService', phuKienService);

    phuKienService.$inject = ['$http'];

    function phuKienService($http) {
        return {
            getphuKien: getphuKien
        }

        function getphuKien() {
            return $http.get('../data/phu-kien/phu-kien.json')
                .success(getPKComplete);
        }

        function getPKComplete(response) {
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
        .module('AccessoryController')
        .controller('AccessoryListController', AccessoryListController);

    AccessoryListController.$inject = ['$scope', 'phuKienService'];

    function AccessoryListController($scope, phuKienService) {
        var vm = this;
        vm.PK = [];
        vm.price = "price";

        activated();
        function activated(){
            return getPK();
        }

        function getPK(){
            return phuKienService.getphuKien()
                .success(function(data){
                    vm.PK = data;
                });
        }
    }

})();
