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
    'errors.location.unsupportedBrowser':'Browser does not support location services',
    'errors.location.permissionDenied':'You have rejected access to your location',
    'errors.location.positionUnavailable':'Unable to determine your location',
    'errors.location.timeout':'Service timeout has been reached'
  });
