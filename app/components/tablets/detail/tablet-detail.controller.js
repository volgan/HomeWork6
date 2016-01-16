(function() {
    /**
     *  Module
     *
     * Description
     */
    angular
        .module('TabletController')
        .factory('TabletDetailService', TabletDetailService);

    TabletDetailService.$inject = ['$http', '$stateParams'];

    function TabletDetailService($http, $stateParams) {
        return {
            getTablet: getTablet
        }

        function getTablet() {
            return $http.get('../data/tablets/' + $stateParams.TabletId + '.json')
                .success(getTabletComplete);
        }

        function getTabletComplete(response) {
            return response.data;
        }
    }
})();


(function() {
    angular
        .module('TabletController')
        .controller('TabletDetailController', TabletDetailController);

    TabletDetailController.$inject = ['TabletDetailService', '$scope', '$uibModal', '$log'];

    function TabletDetailController(TabletDetailService, $scope, $uibModal, $log) {
        var vm = this;
        vm.Tablet = [];
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
            return getTablet();
        }

        function getTablet() {
            return TabletDetailService.getTablet()
                .success(function(data) {
                    vm.Tablet = data;
                    vm.length = vm.Tablet.images.length;
                });
        }

        function OPEN() {
            console.log("new");
            var modalInstance = $uibModal.open({
                animation: vm.animationsEnabled,
                templateUrl: 'components/tablets/detail/ModalDetail.html',
                controller: ModalInstanceCtrl,
                size: 'md',
                resolve: {
                    Tablet: function() {
                        return vm.Tablet;
                    }
                }
            });
        }

        function ModalInstanceCtrl($scope, $uibModalInstance, Tablet) {
            $scope.Tablet = Tablet;

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
