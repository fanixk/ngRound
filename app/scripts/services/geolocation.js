'use strict';

/**
 * @ngdoc service
 * @name ngRoundApp.geoLocation
 * @description
 * # geoLocation
 * Service in the ngRoundApp.
 */
angular.module('ngRoundApp')
  .factory('geoLocation', function ($q, $rootScope, $window, geolocationErrorMsgs) {
    var deferred = $q.defer();
    var service = {};

    service = {
      getPosition: function() {
        if($window.navigator.geolocation) {
          $window.navigator.geolocation.getCurrentPosition(function(position) {
            $rootScope.$apply(function() {
              deferred.resolve(position);
            });
          }, service._error);
        } else {
          var errorMsg = geolocationErrorMsgs.unsupportedBrowser;
          service._rejectAndBroadcast(errorMsg);
        }

        return deferred.promise;
      },
      _error: function(error) {
        var errMsg;
        switch (error.code) {
          case 1:
            errMsg = geolocationErrorMsgs.permissionDenied;
            break;
          case 2:
            errMsg = geolocationErrorMsgs.positionUnavailable;
            break;
          case 3:
            errMsg = geolocationErrorMsgs.timeout;
            break;
        }
        service._rejectAndBroadcast(errMsg);
      },
      _rejectAndBroadcast: function(errMsg) {
        $rootScope.$broadcast('error', errMsg);
        $rootScope.$apply(function() {
          deferred.reject(errMsg);
        });
      }
    };

    return service;
  });
