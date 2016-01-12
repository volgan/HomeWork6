angular
    .module('MyApp', [
        'ui.router',
        'ngMaterial',
        'ngMessages',
        'ngFacebook',
        'directive.g+signin',
        'Home',
        'PhonesController',
        'LaptopController',
        'TabletController',
        'AccessoryController',
        'Location'
    ])
    .config(configFunc)
    .run(runFunc)

configFunc.$inject = ['$stateProvider', '$urlRouterProvider', '$facebookProvider'];

function configFunc($stateProvider, $urlRouterProvider, $facebookProvider) {
    $facebookProvider.setAppId('1514033005563978');

    $urlRouterProvider.otherwise("/");

    $stateProvider
        .state('Main', {
            url: '/',
            templateUrl: 'components/main.html',
            controller: 'MainController'
        })
        .state('Phones', {
            url: '/Phone',
            templateUrl: 'components/phones/list/phone-list.html',
            controller: 'PhoneListController',
            controllerAs: 'PhoneList'
        })
        .state('PhonesDetails', {
            url: '/Phone/:PhoneId',
            templateUrl: 'components/phones/detail/phone-detail.html',
            controller: 'PhoneDetailController',
            controllerAs: 'PhoneDetail'
        })
        .state('Laptop', {
            url: '/Laptop',
            templateUrl: 'components/laptops/list/laptop-list.html',
            controller: 'LaptopListController',
            controllerAs: 'LaptopList'
        })
        .state('LaptopDetails', {
            url: '/Laptop/:LaptopId',
            templateUrl: 'components/laptops/detail/laptop-detail.html',
            controller: 'LaptopDetailController',
            controllerAs: 'LaptopDetail'
        })
        .state('Tablets', {
            url: '/Tablet',
            templateUrl: 'components/tablets/list/tablet-list.html',
            controller: 'TabletListController',
            controllerAs: 'TabletList'
        })
        .state('TabletsDetails', {
            url: '/Tablet/:TabletId',
            templateUrl: 'components/tablets/detail/tablet-detail.html',
            controller: 'TabletDetailController',
            controllerAs: 'TabletList'
        })
        .state('Accessories', {
            url: '/phu-kien',
            templateUrl: 'components/accessories/list/Accessory-list.html',
            controller: 'AccessoryListController',
            controllerAs: 'AccessoryList'
        })
        .state('Location', {
            url: '/Location',
            templateUrl: 'components/Location/location.html',
            controller: 'LocationController',
            controllerAs: 'location'
        })

}

function runFunc() {
    (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s);
        js.id = id;
        js.src = "//connect.facebook.net/vi_VN/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
}
