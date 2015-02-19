'use strict';

/**
 * @ngdoc function
 * @name ngRoundApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the ngRoundApp
 */
angular.module('ngRoundApp')
  .controller('MainCtrl', function ($scope, twitterService, geoLocation) {

    $scope.twitterService = twitterService;

    //twitterService.search({long: 37.962564, lat: 23.730174, radius: 1});

    geoLocation.getPosition().then(function(data) {
      $scope.coords = {
        lat:data.coords.latitude,
        long:data.coords.longitude
      };
    });
  });
