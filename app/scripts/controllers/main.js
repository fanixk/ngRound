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
    $scope.radius = 1;

    geoLocation.getPosition().then(function(data) {
      $scope.coords = {
        long:data.coords.longitude,
        lat:data.coords.latitude
      };

      _doSearch();
    });

    function _doSearch() {
      twitterService.search({
        long: $scope.coords.long,
        lat: $scope.coords.lat,
        radius: $scope.radius
      }).then(function(data) {
        console.log(data);

        data.statuses.forEach(function(tweet) {
          console.log(tweet.user.screen_name + ': ' + tweet.text);
        });
      });
    }
  });
