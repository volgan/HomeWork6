(function() {
    angular
        .module('MyApp')
        .factory('SearchService', SearchService);

    SearchService.$inject = ['$http'];

    function SearchService($http) {
        return {
            getData: getData
        }

        function getData() {
            return $http.get('../data/search.json')
                .success(getDataComplete);
        }

        function getDataComplete(response) {
            return response.data;
        }
    }
})();

(function() {
    'use strict';
    angular
        .module('MyApp')
        .controller('SearchCtrl', SearchCtrl)
        .filter('comma2dot', comma2dot)

        function comma2dot() {
            return function(input) {
                var ret = (input) ? input.replace(/,/g, ".") : null;
                return ret;
            };
        }

    SearchCtrl.$inject = ['SearchService', "$timeout", "$q"];

    function SearchCtrl(SearchService, $timeout, $q) {
        var vm = this;
        vm.simulateQuery = false;
        vm.isDisabled = false;
        vm.querySearch = querySearch;
        vm.repos = [];
        // console.log(SearchService);
        activated();

        function activated() {
            return getData();
        }

        function getData() {
            return SearchService.getData()
                .success(function(data) {
                    vm.repos = data;
                });
        }

        function querySearch(query) {
            // console.log(q)
            var results = query ? vm.repos.filter(createFilterFor(query)) : vm.repos,
                deferred;
            if (vm.simulateQuery) {
                deferred = $q.defer();
                $timeout(function() {
                    deferred.resolve(results);
                }, Math.random() * 1000, false);
                return deferred.promise;
            } else {
                return results;
            }
        }

        /**
         * Create filter function for a query string
         */
        function createFilterFor(query) {
            var lowercaseQuery = angular.lowercase(query);
            var sim = "ASUS Transformer Book T200TA";
            return function filterFn(item) {
                // console.log(angular.lowercase(sim).indexOf(lowercaseQuery));
                return (angular.lowercase(item.name).indexOf(lowercaseQuery) >= 0);
            };
        }
    }
})();