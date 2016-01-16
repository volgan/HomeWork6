(function() {
    'use strict';
    /**
     *  Module
     *
     * Description
     */
    angular
        .module('PhonesController')
        .factory('phoneDetailService', phoneDetailService);

    phoneDetailService.$inject = ['$http', '$stateParams'];

    function phoneDetailService($http, $stateParams) {
        return {
            getphones: getphones
        }

        function getphones() {
            return $http.get('../data/phones/' + $stateParams.PhoneId + '.json')
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
    'use strict';
    angular
        .module('PhonesController')
        .controller('PhoneDetailController', PhoneDetailController);

    PhoneDetailController.$inject = ['$scope', 'phoneDetailService', '$uibModal', '$log'];

    function PhoneDetailController($scope, phoneDetailService, $uibModal, $log) {
        var vm = this;
        vm.phone = {};       
        vm.animationsEnabled = true;        
        vm.OPEN = OPEN;
        vm.index = 0;
        vm.length = 0;
        vm.next = NEXT;
        vm.prev = PREV;
        vm.selectIMG = selectIMG;



        activated();
        function activated() {
            return getPhone();
        };

        function getPhone() {
            return phoneDetailService.getphones()
                .success(function(data) {
                    vm.phone = data;
                    vm.length = vm.phone.images.length;
                    // console.log(vm.phone.images.length);
                });
        };

        function OPEN() {
            console.log("new");
            var modalInstance = $uibModal.open({
                animation: vm.animationsEnabled,
                templateUrl: 'components/phones/detail/ModalDetail.html',
                controller: ModalInstanceCtrl,
                size: 'md',
                resolve: {
                    phone: function() {
                        return vm.phone;
                    }
                }
            });
        }

        function ModalInstanceCtrl($scope, $uibModalInstance, phone) {
            $scope.phone = phone;

            $scope.ok = OK;

            $scope.cancel = cancel;

            function OK() {
                $uibModalInstance.close($scope.selected.item);
            }

            function cancel() {
                $uibModalInstance.dismiss('cancel');
            }
        }

        function NEXT () {
            if (vm.index == (vm.length - 1))
            {
                // console.log(vm.index);
                vm.index = 0;
            }
            else 
            {
                // console.log(vm.index);
                vm.index = vm.index + 1;
            }
        }

        function PREV () {
            if (vm.index == 0)
            {
                // console.log(vm.index);
                vm.index = vm.length - 1;;
            }
            else 
            {
                // console.log(vm.index);
                vm.index = vm.index - 1;
            }
        }

        function selectIMG (indexIMG) {
            vm.index = indexIMG;
            // console.log(imgLink)
        }
    }
})();
