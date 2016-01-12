(function(){
    /**
    *  Module
    *
    * Description
    */
    angular
        .module('TabletController')
        .factory('TabletDetailService', TabletDetailService);

        TabletDetailService.$inject = ['$http','$stateParams'];
        function TabletDetailService ($http,$stateParams) {
            return {
                getTablets : getTablets
            }
            function getTablets () {
                return $http.get('../data/tablets/'+$stateParams.TabletId+'.json')
                    .success(getTabletComplete);
            }
            function getTabletComplete (response) {
                return response.data;
            }
        }
})();


(function() {
    angular
        .module('TabletController')
        .controller('TabletDetailController', TabletDetailController);

    TabletDetailController.$inject = ['TabletDetailService', '$scope'];

    function TabletDetailController(TabletDetailService, $scope) {
        var vm = this;
        vm.tablets = [];
        vm.price = "price";
        
        activated();
        function activated(){
            return getTablet();
        }

        function getTablet (){
            return TabletDetailService.getTablets()
                .success(function(data){
                    vm.tablets = data;
                });
        }
    }

})();
