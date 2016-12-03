'use strict';

// IIFE Construct for angular module
(function(angular){
    // callback for app config
    function AppConfig($stateProvider, $urlRouterProvider, $httpProvider){
        // enable CORS
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];

        // define states
        $stateProvider
        .state('main', {
            templateUrl: 'main.tpl.html',
            controller: 'MainController as MainCtrl'
        })
        .state('main.list', {
            url: '/list',
            templateUrl: 'list.tpl.html',
            controller: 'ListController as listCtrl'
        })
        .state('main.favorite', {
            url: '/favorite',
            templateUrl: 'favorite.tpl.html',
            controller: 'FavoriteController as FavCtrl'
        })
        .state('main.report', {
            url: '/report/:id',
            templateUrl: 'report.tpl.html',
            controller: 'ReportController as reportCtrl'
        });

        $urlRouterProvider.otherwise('/list');
    }

    // callback for app run
    function AppRun($rootScope){
        $rootScope.errorField = false;
        $rootScope.errorMessage = '';
    }

    // inject dependencies
    AppConfig.$inject = ['$stateProvider', '$urlRouterProvider', '$httpProvider'];
    AppRun.$inject = ['$rootScope'];

    // define the module
    angular.module('foodApp',[
        'ngAnimate','ngResource','ngSanitize',
        'ui.bootstrap','ui.router','ui.grid',
        'ui.grid.pagination','ui.grid.edit','ui.grid.selection','ui.grid.resizeColumns','ui.grid.moveColumns',
        'foodApp.controllers','foodApp.services'])
        .config(AppConfig)
        .run(AppRun);

    angular.module('foodApp.controllers',[]);
    angular.module('foodApp.services',[]);
})(window.angular || (window.angular = {}));