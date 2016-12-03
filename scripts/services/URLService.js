'use strict';

// IIFE construct for the service
(function(angular){
    function URLService(){
        var self = this;

        self.api_key = 'wjmozvBjXe3xAPj245Xyn3C1x63RVtnXbHZabp3L';

        self.url = {
            'search': 'http://api.nal.usda.gov/ndb/search/?format=json&api_key='+self.api_key+'&q=',
            'reports': 'http://api.nal.usda.gov/ndb/reports/?format=json&api_key='+self.api_key+'&ndbno='
        };

        return self.url;
    }

    angular.module('foodApp.services').factory('URLService',URLService);
})(window.angular || (window.angular = {}));