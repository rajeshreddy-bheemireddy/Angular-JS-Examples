// IIFE construct for angular controller
(function(angular){
    // controller callback
    function MainController(){
        // reference this variable
        //var vm = this;
    }

    // inject dependencies
    MainController.$inject = [];

    // controller definition
    angular.module('foodApp.controllers').controller('MainController',MainController);
})(window.angular || (window.angular = {}));