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
        long: data.coords.longitude,
        lat: data.coords.latitude
      };

      _doSearch();
    });

    function _doSearch() {
      twitterService.search({
        long: $scope.coords.long,
        lat: $scope.coords.lat,
        radius: $scope.radius
      }).then(_buildTweets);
    }

    function _buildTweets(data) {
      $scope.tweets = data.statuses.map(function(tweet) {
        return {
          username: tweet.user.screen_name,
          text: tweet.text
        };
      });
    }
    //$http.get('/tw/search?q=%20&geocode=37.962564,23.730174,1km&count=20').success(function(data) {
    //  console.log(data);
    //}).error(function(err) {
    //  console.log(err);
    //});
  });
