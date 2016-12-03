// IIFE construct for angular controller
(function(angular){
    // controller callback
    function FavoriteController(FavoriteService,$state){
        // reference this variable
        var vm = this;

        vm.init = function(){
            vm.favorites = [];

            FavoriteService.loadFavorites(vm);
        };
        vm.init();

        vm.viewFav = function(fav){
            $state.go('main.report',{'id': fav.ndbno});
        };

        vm.removeFav = function(fav){
            FavoriteService.removeFav(fav,vm);
        };
    }

    // inject dependencies
    FavoriteController.$inject = ['FavoriteService','$state'];

    // controller definition
    angular.module('foodApp.controllers').controller('FavoriteController',FavoriteController);
})(window.angular || (window.angular = {}));