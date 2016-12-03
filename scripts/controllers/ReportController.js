// IIFE construct for angular controller
(function(angular){
    // controller callback
    function ReportController(ReportService,$stateParams){
        // reference this variable
        var vm = this;

        vm.setFavFood = false;

        vm.init = function(){
            vm.food = {
                ndbno: '',
                name: ''
            };
            vm.reportGridOpt = {
                enableSorting : true,
                enableFiltering: true,
                enableColumnMenus: false,
                enableRowSelection: true,
                enableColumnResizing: true,
                enableRowHeaderSelection: true,
                enableFullRowSelection: true,
                enableGridMenu : true,
                multiSelect: false,
                paginationPageSizes: [5, 10, 25, 50, 100],
                paginationPageSize: 10,
                columnDefs : [
                {
                    field : "name",
                    displayName : 'Nutrient Name',
                    width: '50%'
                },
                {
                    field: "value",
                    displayName : 'Value',
                    width: '50%',
                    cellTemplate: '<div class="ngCellText">{{row.entity.value}}{{row.entity.unit}}</div>'
                }
                ],
                onRegisterApi : function(gridApi) {
                    vm.gridApi = gridApi;
                }
            };

            ReportService.loadReport($stateParams.id,vm);
        };
        vm.init();

        // mark food as favorite
        vm.markFav = function(e,food){
            e.preventDefault();
            if(!vm.setFavFood){
                ReportService.markFav(food,vm);
            }
        };
    }

    // inject dependencies
    ReportController.$inject = ['ReportService','$stateParams'];

    // controller definition
    angular.module('foodApp.controllers').controller('ReportController',ReportController);
})(window.angular || (window.angular = {}));