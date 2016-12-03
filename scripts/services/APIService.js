'use strict';

// IIFE construct for the service
(function(angular){
    function APIService($resource,$q,$window){
        var self = this;

        // GET call
        self.get = function(url,format){
            var deferred = $q.defer();
            self.data = {};

            switch(format){
                case 'object':{
                    $resource(url).get().$promise.then(function(data) {
                        deferred.resolve(data);
                    });
                }
                    break;
                case 'array':{
                    $resource(url).query().$promise.then(function(data) {
                        deferred.resolve(data);
                    });
                }
                    break;
            }

            return deferred.promise;
        };

        // POST call
        self.post = function(url,request){
            var deferred = $q.defer();
            self.data = {};

            $resource(url).save(request).$promise.then(function(data) {
                deferred.resolve(data);
            });
            return deferred.promise;
        };

        // PUT call
        self.put = function(url,request){
            var deferred = $q.defer();
            self.data = {};

            $resource(url,null,{'update':{method:'PUT'}}).update(request).$promise.then(function(data) {
                deferred.resolve(data);
            });

            return deferred.promise;
        };

    }

    APIService.$inject = ['$resource','$q','$window'];
    angular.module('foodApp.services').service('APIService',APIService);
})(window.angular || (window.angular = {}));