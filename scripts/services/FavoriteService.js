// IIFE construct for angular service
(function(angular){
    // service callback
    function FavoriteService($rootScope,$window){
        // reference the this variable
        var self = this;

        // load favorites
        self.loadFavorites = function(vm){
            $rootScope.errorField = false;
            $rootScope.errorMessage = '';

            self.favorites = [];

            if($window.sessionStorage.getItem('favFood')){
                self.favorites = angular.copy(JSON.parse($window.sessionStorage.getItem('favFood')));
                vm.favorites = angular.copy(self.favorites);
            }
            else{
                $rootScope.errorField = true;
                $rootScope.errorMessage = 'Failed to load list of favorite foods';
                vm.favorites = [];
                self.favorites = [];
            }
        };

        self.removeFav = function(fav,vm){
            vm.favorites.splice(vm.favorites.indexOf(fav),1);
            self.favorites = angular.copy(vm.favorites);

            $window.sessionStorage.removeItem('favFood');
            $window.sessionStorage.setItem('favFood', JSON.stringify(self.favorites));
        };

    }

    // inject dependencies
    FavoriteService.$inject = ['$rootScope','$window'];

    // service definition
    angular.module('foodApp.services').service('FavoriteService',FavoriteService);
})(window.angular || (window.angular = {}));
