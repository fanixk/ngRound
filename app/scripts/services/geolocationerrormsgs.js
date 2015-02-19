'use strict';

/**
 * @ngdoc service
 * @name ngRoundApp.geolocationErrorMsgs
 * @description
 * # geolocationErrorMsgs
 * Constant in the ngRoundApp.
 */
angular.module('ngRoundApp')
  .constant('geolocationErrorMsgs', {
    'unsupportedBrowser':'Browser does not support location services',
    'permissionDenied':'You have rejected access to your location',
    'positionUnavailable':'Unable to determine your location',
    'timeout':'Service timeout has been reached'
  });
