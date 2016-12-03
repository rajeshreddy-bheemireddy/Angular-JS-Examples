// IIFE construct for angular controller
(function(angular){
    // controller callback
    function ListController(ListService,$state,$scope){
        // reference this variable
        var vm = this;

        vm.initGrid = function(){
            vm.searchGridOpt = {
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
                    field : "ndbno",
                    displayName : 'NDB No.',
                    width: '33.33%'
                },
                {
                    field : "name",
                    displayName : 'Name',
                    width: '33.33%'
                },
                {
                    field: "group",
                    displayName : 'Group',
                    width: '33.33%'
                }
                ],
                onRegisterApi : function(gridApi) {
                    $scope.gridApi = gridApi;
                }
            };
        };

        // search for books after the click search
        vm.search = function(searchString){
            ListService.search(searchString,vm);
        };

        // open basic report
        vm.showBasicReport = function(){
            if($scope.gridApi.selection.getSelectedCount() != 1) {
                return null;
            }
            else{
                var row = $scope.gridApi.selection.getSelectedRows()[0];
                $state.go('main.report',{id: row.ndbno});
            }
        };
    }

    // inject dependencies
    ListController.$inject = ['ListService','$state','$scope'];

    // controller definition
    angular.module('foodApp.controllers').controller('ListController',ListController);
})(window.angular || (window.angular = {}));