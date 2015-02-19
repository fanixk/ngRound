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
          var error = geolocationErrorMsgs.errors.locacation.unsupportedBrowser;
          this._rejectAndBroadcast(error);
        }

        return deferred.promise;
      },
      _error: function(error) {
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

      },
      _rejectAndBroadcast: function(errMsg) {
        $rootScope.$broadcast('error', errMsg);
        $rootScope.$apply(function() {
          deferred.reject(errMsg);
        });
      }

    };
  });
