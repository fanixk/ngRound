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
    var deferred = $q.defer();

    return {
      getPosition: function() {
        if(navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            $rootScope.$apply(function() {
              deferred.resolve(position);
            });
          }, function(error) { this._error(error); });

        } else {
          var error = geolocationErrorMsgs.unsupportedBrowser;
          this._rejectAndBroadcast(error);
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
      },
      _rejectAndBroadcast: function(errMsg) {
        $rootScope.$broadcast('error', errMsg);
        $rootScope.$apply(function() {
          deferred.reject(errMsg);
        });
      }
    };
  });
