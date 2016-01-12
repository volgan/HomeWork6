(function() {
    /**
     *  Module
     *
     * Description
     */
    angular.module('Home', [])
        .controller('MainController', MainController);

    MainController.$inject = ['$scope'];

    function MainController($scope) {

    }
})();
(function() {
    /**
     *  Module
     *
     * Description
     */
    angular.module('MyApp')
        .controller('DemoCtrl', DemoCtrl);

    function DemoCtrl($timeout, $q, $log) {
        var self = this;
        self.simulateQuery = false;
        self.isDisabled = false;
        // list of `state` value/display objects
        self.states = loadAll();
        self.querySearch = querySearch;
        self.selectedItemChange = selectedItemChange;
        self.searchTextChange = searchTextChange;
        self.newState = newState;

        function newState(state) {
            alert("Sorry! You'll need to create a Constituion for " + state + " first!");
        }
        // ******************************
        // Internal methods
        // ******************************
        /**
         * Search for states... use $timeout to simulate
         * remote dataservice call.
         */
        function querySearch(query) {
            var results = query ? self.states.filter(createFilterFor(query)) : self.states,
                deferred;
            if (self.simulateQuery) {
                deferred = $q.defer();
                $timeout(function() {
                    deferred.resolve(results);
                }, Math.random() * 1000, false);
                return deferred.promise;
            } else {
                return results;
            }
        }

        function searchTextChange(text) {
            $log.info('Text changed to ' + text);
        }

        function selectedItemChange(item) {
            $log.info('Item changed to ' + JSON.stringify(item));
        }
        /**
         * Build `states` list of key/value pairs
         */
        function loadAll() {
            var allStates = 'Samsung galaxy Tab, Nokia lumia, Iphone';
            return allStates.split(/, +/g).map(function(state) {
                return {
                    value: state.toLowerCase(),
                    display: state
                };
            });
        }
        /**
         * Create filter function for a query string
         */
        function createFilterFor(query) {
            var lowercaseQuery = angular.lowercase(query);
            return function filterFn(state) {
                return (state.value.indexOf(lowercaseQuery) === 0);
            };
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
        .module('MyApp')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$scope', '$facebook'];

    function LoginController($scope, $facebook) {
        var vm = this;
        vm.isOpen = false;
        vm.Email = "";
        vm.Name = "";
        vm.Avatar = "";
        vm.displayIcon = {display: 'block'};
        vm.display = {display: 'none'};

        vm.FBLogin = function() {
            $facebook.login().then(function() {
                console.log('fb login');
                getInfo();
            });
        };

        function getInfo() {
            $facebook.api('/me?fields=id,name,email,picture').then(function(resp) {
                vm.Email = resp.email;
                vm.Name = resp.name;
                vm.Avatar = resp.picture.data.url;

                console.log(vm.Avatar);
                vm.displayIcon = {display: 'none'};
                vm.display = {display: 'block'};
            }, function(err) {
                console.log('error');
            });
        };

        vm.FBLogout = function(){
            $facebook.logout().then(function(){
                vm.displayIcon = {display: 'block'};
                vm.display = {display: 'none'};                
            });
        };
        // $scope.$on('event:google-plus-signin-success', function(event, authResult) {
        //     gapi.client.load('plus', 'v1', function() {
        //         var request = gapi.client.plus.people.get({
        //             'userId': 'me'
        //         });
        //         request.execute(function(resp) {
        //             console.log(resp.name);
        //             console.log(resp.emails[0]);
        //         });
        //     });

        // });
    }
})();
