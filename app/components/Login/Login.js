(function() {
    /**
     *  Module
     *
     * Description
     */
    angular
        .module('MyApp')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$scope', '$facebook', '$uibModal'];

    function LoginController($scope, $facebook, $uibModal) {
        var vm = this;
        vm.isOpen1 = false;
        vm.isOpen2 = false;
        vm.display = true;
        vm.Avatar = "";
        vm.Email = "";
        vm.Name = "";
        vm.FBLogin = FBLogin;
        vm.Logout = Logout;
        vm.animationsEnabled = true;
        vm.register = register;
        vm.poseidonLogin = poseidonLogin;
        // vm.display = {display: 'none'};

        function FBLogin() {
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
                vm.display = false;
            }, function(err) {
                console.log('error');
            });
        };

        function Logout() {
            vm.Email = "";
            vm.Name = "";
            vm.display = true;
        };

        function register() {
            var modalInstance = $uibModal.open({
                animation: vm.animationsEnabled,
                templateUrl: 'components/Login/RegisterModal.html',
                controller: RegisterModalCtr,
                controllerAs: 'register',
                size: 'md',
                resolve: {
                    Tablet: function() {
                        return vm.Tablet;
                    }
                }
            });
        }

        function poseidonLogin() {
            var modalInstance = $uibModal.open({
                animation: vm.animationsEnabled,
                templateUrl: 'components/Login/LoginModal.html',
                controller: LoginModalCtrl,
                controllerAs: 'login',
                size: 'md',
                resolve: {
                    Tablet: function() {
                        return vm.Tablet;
                    }
                }
            });
        }

        function RegisterModalCtr($scope, $uibModalInstance) {
            var register = this;
            register.isconfirm = false;
            register.show = false;
            register.id = "";
            register.name = "";
            register.Email = "";
            register.Pass = "";
            register.RePass = "";
            register.Register = Register;
            register.cancel = cancel;
            register.compare = compare;

            function cancel() {
                $uibModalInstance.dismiss('cancel');
            }

            function Register() {
                vm.Avatar = "../images/User-Login.png";
                vm.Email = register.Email;
                vm.Name = register.name;
                vm.display = false;
                cancel();
            }

            function compare($event) {
                // console.log($event.keyCode);
                if ((($event.keyCode >= 48) && ($event.keyCode <= 57)) || (($event.keyCode >= 65) && ($event.keyCode <= 90)))
                {
                    // console.log(register.isconfirm);
                    console.log("RePass: " + register.RePass + " Pass: " + register.Pass);
                    if (register.Pass == register.RePass) {

                        register.isconfirm = true;
                        register.show = false;
                        console.log(register.isconfirm);
                    }
                    else {
                        register.show = true;
                    }
                    
                }
            }
        }

        function LoginModalCtrl($scope, $uibModalInstance) {
            var login = this;
            login.Email = "";
            login.LOGIN = LOGIN;
            login.cancel = cancel;

            function cancel() {
                $uibModalInstance.dismiss('cancel');
            }

            function LOGIN() {
                vm.Avatar = "../images/User-Login.png";
                vm.Email = login.Email;
                vm.Name = login.Email;
                vm.display = false;
                cancel();
            }

        }
    }
})();
