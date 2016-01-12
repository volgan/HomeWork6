(function(){
    /**
    *  Module
    *
    * Description
    */
    angular
        .module('PhonesController')
        .factory('phoneDetailService', phoneDetailService);

        phoneDetailService.$inject = ['$http', '$stateParams'];
        function phoneDetailService ($http,$stateParams) {
            return {
                getphones : getphones
            }
            function getphones () {
                return $http.get('../data/phones/'+$stateParams.PhoneId+'.json')
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
        .controller('PhoneDetailController', PhoneDetailController);

    PhoneDetailController.$inject = ['$scope', 'phoneDetailService'];

    function PhoneDetailController($scope,phoneDetailService) {
        var $scope = this;
        $scope.phone = {};
        $scope.price = "price";
        
        activated();
        function activated(){
            return getPhone();
        };

        function getPhone (){
            return phoneDetailService.getphones()
                .success(function(data){
                    $scope.phone = data;
                });
        };
    }

})();
