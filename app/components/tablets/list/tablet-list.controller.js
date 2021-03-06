(function() {
    /**
     *  Module
     *
     * Description
     */
    angular
        .module('TabletController', [])
        .factory('tabletservice', tabletservice);
    tabletservice.$inject = ['$http'];

    function tabletservice($http) {
        return {
            getTablets: getTablets
        }

        function getTablets() {
            return $http.get('../data/tablets/tablets.json')
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
        .controller('TabletListController', TabletListController)
        .filter('comma2dot', comma2dot)

    function comma2dot() {
        return function(input) {
            var ret = (input) ? input.replace(/,/g, ".") : null;
            return ret;
        };
    }

    TabletListController.$inject = ['tabletservice', '$scope'];

    function TabletListController(tabletservice, $scope) {
        var vm = this;
        vm.tablets = [];
        vm.price = "price";

        activated();
        function activated() {
            return getTablet();
        }

        function getTablet() {
            return tabletservice.getTablets()
                .success(function(data) {
                    vm.tablets = data;
                });
        }
    }

})();
