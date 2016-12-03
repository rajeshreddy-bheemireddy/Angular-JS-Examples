// IIFE construct for angular service
(function(angular){
    // service callback
    function ListService($rootScope,APIService,URLService){
        // reference the this variable
        var self = this;

        // search for foods
        self.search = function(search,vm){
            $rootScope.errorField = false;
            $rootScope.errorMessage = '';

            APIService.get(URLService.search+search,'object').then(function(response){
                if(response.list){
                    vm.initGrid();
                    vm.searchGridOpt.data = response.list.item;
                }
                else{
                    $rootScope.errorField = true;
                    $rootScope.errorMessage = response.errors.error[0].message;
                }
            },function(rejection){
                $rootScope.errorField = true;
                $rootScope.errorMessage = 'Failed to load the search result'
            });
        };
    }

    // inject dependencies
    ListService.$inject = ['$rootScope','APIService','URLService'];

    // service definition
    angular.module('foodApp.services').service('ListService',ListService);
})(window.angular || (window.angular = {}));
