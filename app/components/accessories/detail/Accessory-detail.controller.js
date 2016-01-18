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
        vm.cmts = [];
        vm.replies = [];
        vm.rep;
        vm.cmt;
        vm.addCmt = addCmt;
        vm.addRep = addRep;
        vm.displayRepForm = displayRepForm;
        vm.displayRep = displayRep;
        vm.showRepForm = {
            display: 'none'
        };
        vm.showRep = {
            display: 'none'
        };

        function addCmt(tablet) {
            vm.cmts.push(vm.cmt);
            vm.showRep = {
                display: 'none'
            };
            vm.showRepForm = {
                display: 'none'
            };
            vm.cmt = null;
        }

        function addRep(tablet) {
            vm.replies.push(vm.rep);
            vm.showRep = {
                display: 'block'
            };
            vm.rep = null;
        }

        function displayRepForm() {
            vm.showRepForm = {
                display: 'block'
            };
        }

        function displayRep() {
            vm.showRep = {
                display: 'block'
            };
        }
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
