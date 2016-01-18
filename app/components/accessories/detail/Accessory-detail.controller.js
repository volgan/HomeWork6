(function() {
    /**
     *  Module
     *
     * Description
     */
    angular
        .module('AccessoryController')
        .factory('PKDetailService', PKDetailService);

    PKDetailService.$inject = ['$http', '$stateParams'];

    function PKDetailService($http, $stateParams) {
        return {
            getPK: getPK
        }

        function getPK() {
            return $http.get('../data/phu-kien/' + $stateParams.PKID + '.json')
                .success(getComplete);
        }

        function getComplete(response) {
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
        .controller('PKController', PKController);

    PKController.$inject = ['$scope', 'PKDetailService', '$uibModal', '$log'];

    function PKController($scope, PKDetailService, $uibModal, $log) {
        var vm = this;
        vm.PK = {};
        vm.price = "price";
        
        activated();

        function activated() {
            return getPK();
        }

        function getPK() {
            return PKDetailService.getPK()
                .success(function(data) {
                    vm.PK = data;
                    vm.length = vm.PK.images.length;
                });
        }        
    }

})();
