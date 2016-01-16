(function() {
    /**
     *  Module
     *
     * Description
     */
    angular
        .module('LaptopController')
        .factory('LaptopDetailservice', LaptopDetailservice);

    LaptopDetailservice.$inject = ['$http', '$stateParams'];

    function LaptopDetailservice($http, $stateParams) {
        return {
            getLaptops: getLaptops
        }

        function getLaptops() {
            return $http.get('../data/laptops/' + $stateParams.LaptopId + '.json')
                .success(getphoneComplete);
        }

        function getphoneComplete(response) {
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

    LaptopDetailController.$inject = ['$scope', 'LaptopDetailservice', '$uibModal', '$log'];

    function LaptopDetailController($scope, LaptopDetailservice, $uibModal, $log) {
        var vm = this;
        vm.Laptop = {};
        vm.price = "price";
        vm.animationsEnabled = true;
        vm.OPEN = OPEN;
        vm.index = 0;
        vm.length = 0;
        vm.next = NEXT;
        vm.prev = PREV;
        vm.selectIMG = selectIMG;

        activated();

        function activated() {
            return getLaptop();
        }

        function getLaptop() {
            return LaptopDetailservice.getLaptops()
                .success(function(data) {
                    vm.Laptop = data;
                    vm.length = vm.Laptop.images.length;
                });
        }

        function OPEN() {
            console.log("new");
            var modalInstance = $uibModal.open({
                animation: vm.animationsEnabled,
                templateUrl: 'components/laptops/detail/ModalDetail.html',
                controller: ModalInstanceCtrl,
                size: 'md',
                resolve: {
                    Laptop: function() {
                        return vm.Laptop;
                    }
                }
            });
        }

        function ModalInstanceCtrl($scope, $uibModalInstance, Laptop) {
            $scope.Laptop = Laptop;

            $scope.ok = OK;

            $scope.cancel = cancel;

            function OK() {
                $uibModalInstance.close($scope.selected.item);
            }

            function cancel() {
                $uibModalInstance.dismiss('cancel');
            }
        }

        function NEXT() {
            if (vm.index == (vm.length - 1)) {
                // console.log(vm.index);
                vm.index = 0;
            } else {
                // console.log(vm.index);
                vm.index = vm.index + 1;
            }
        }

        function PREV() {
            if (vm.index == 0) {
                // console.log(vm.index);
                vm.index = vm.length - 1;;
            } else {
                // console.log(vm.index);
                vm.index = vm.index - 1;
            }
        }

        function selectIMG(indexIMG) {
            vm.index = indexIMG;
            // console.log(imgLink)
        }
    }

})();
