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
            getphones: getphones,
            getphuKien: getphuKien
        }

        function getphones() {
            return $http.get('../data/phones/' + $stateParams.PhoneId + '.json')
                .success(getComplete);
        }

        function getphuKien() {
            return $http.get('../data/phu-kien/phu-kien.json')
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

        var TypePK = ['tai nghe', 'cáp sạc', 'ốp lưng', 'pin dự phòng', 'thẻ nhớ', 'miếng dán']
        vm.PK = [];

        //Get Phu kien
        activated_PK();

        function activated_PK() {
            return getPK();
        }

        function getPK() {
            return phoneDetailService.getphuKien()
                .success(function(data) {
                    $.each(data, function(index, val) {
                        var lowercaseVal = angular.lowercase(val.name);
                        for (var i = 0; i < TypePK.length; i++) {
                            if (lowercaseVal.indexOf(angular.lowercase(TypePK[i])) >= 0) {
                                vm.PK.push(val);
                            }
                        }
                    });
                });
        }

        //Get Phone data
        activated();

        function activated() {
            return getPhone();
        };

        function getPhone() {
            return phoneDetailService.getphones()
                .success(function(data) {
                    vm.phone = data;
                    vm.length = vm.phone.images.length;
                });
        };

        //Comment
        function addCmt(phone) {
            vm.cmts.push(vm.cmt);
            vm.showRep = {
                display: 'none'
            };
            vm.showRepForm = {
                display: 'none'
            };
            vm.cmt = null;
        }

        function addRep(phone) {
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

        function hideRepForm() {
            vm.showRepForm = {
                display: 'none'
            };
        }

        function displayRep() {
            vm.showRep = {
                display: 'block'
            };
        }

        //Modal
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

        //Images
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
