// IIFE construct for angular service
(function(angular){
    // service callback
    function ReportService($rootScope,APIService,URLService,$window){
        // reference the this variable
        var self = this;

        self.favFood = [];

        // load report
        self.loadReport = function(ndbno,vm){
            $rootScope.errorField = false;
            $rootScope.errorMessage = '';

            APIService.get(URLService.reports+ndbno,'object').then(function(response){
                if(response.report){
                    vm.food = response.report.food;
                    vm.reportGridOpt.data = angular.copy(vm.food.nutrients);

                    // check for fav food
                    if($window.sessionStorage.getItem('favFood')){
                        self.favFood = angular.copy(JSON.parse($window.sessionStorage.getItem('favFood')));

                        for(var i = 0; i < self.favFood.length; i++){
                            if(vm.food.ndbno === self.favFood[i].ndbno){
                                vm.setFavFood = true;
                                break;
                            }
                        }
                    }
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

        self.markFav = function(food,vm){
            if($window.sessionStorage.getItem('favFood')){
                self.favFood = angular.copy(JSON.parse($window.sessionStorage.getItem('favFood')));
            }
            self.favFood.push(food);
            $window.sessionStorage.setItem('favFood', JSON.stringify(self.favFood));
            vm.setFavFood = true;
        };
    }

    // inject dependencies
    ReportService.$inject = ['$rootScope','APIService','URLService','$window'];

    // service definition
    angular.module('foodApp.services').service('ReportService',ReportService);
})(window.angular || (window.angular = {}));
