'use strict';

/**
 * @ngdoc service
 * @name ngRoundApp.geoLocation
 * @description
 * # geoLocation
 * Service in the ngRoundApp.
 */
angular.module('ngRoundApp')
  .factory('geoLocation', function ($q, $rootScope, geolocationErrorMsgs) {
    return {

      getPosition: function() {
        var deferred = $q.defer();

        if(navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            $rootScope.$apply(function() {
              deferred.resolve(position);
            });
          }, function(error) { this._error(error, deferred); });
        } else {
          var error = geolocationErrorMsgs.errors.locacation.unsupportedBrowser;
          $rootScope.$broadcast('error', error);
          $rootScope.$apply(function() {
            deferred.reject(error);
          });
        }

        return deferred.promise;
      },
      _error: function(error, deferred) {
        var errMsg;
        switch (error.code) {
          case 1:
            errMsg = geolocationErrorMsgs.errors.location.permissionDenied;
            break;
          case 2:
            errMsg = geolocationErrorMsgs.errors.location.positionUnavailable;
            break;
          case 3:
            errMsg = geolocationErrorMsgs.errors.location.timeout;
            break;
        }
        $rootScope.$broadcast('error', errMsg);
        $rootScope.$apply(function() {
          deferred.reject(errMsg);
        });
      }

    };
  });
