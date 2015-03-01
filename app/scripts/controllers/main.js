'use strict';

/**
 * @ngdoc function
 * @name ngRoundApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the ngRoundApp
 */
angular.module('ngRoundApp')
  .controller('MainCtrl', function ($scope, twitterService, geoLocation, $q) {
    $scope.radius = 1;
    $scope.tweets = [];
    $scope.markers = [];

    geoLocation.getPosition().then(function(data) {
      $scope.coords = {
        long: data.coords.longitude,
        lat: data.coords.latitude
      };

      _doSearch()
        .then(_buildMap);
    });

    function _doSearch() {
      var deferred = $q.defer();

      var promise = twitterService.search({
        long: $scope.coords.long,
        lat: $scope.coords.lat,
        radius: $scope.radius
      }).then(_buildTweets);

      deferred.resolve(promise);
      return deferred.promise;
    }

    function _buildTweets(data) {
      $scope.tweets = data.statuses.map(function(tweet) {
        return {
          username: tweet.user.screen_name,
          text: tweet.text,
          coordinates: tweet.coordinates.coordinates
        };
      });
    }

    function _buildMap() {
      var myLat = $scope.coords.lat;
      var myLong = $scope.coords.long;

      $scope.map = {
        center: {
          latitude: myLat,
          longitude: myLong
        },
        zoom: 14,
        options: {
          scrollwheel: false
        },
        markersEvents: {
          click: function(marker, eventName, model) {
            $scope.map.window.model = model;
            $scope.map.window.username = model.username;
            $scope.map.window.tweet = model.tweet;
            $scope.map.window.show = true;
          }
        },
        window: {
          marker: {},
          show: false,
          closeClick: function() {
            this.show = false;
          },
          options: {} // define when map is ready
        }
      };

      var createMarker = function(i, tweet, idKey) {
        if (idKey == null) {
          idKey = "id";
        }
        var ret = {
          latitude: tweet.coordinates[1],
          longitude: tweet.coordinates[0],
          username: tweet.username,
          tweet: tweet.text
        };
        ret[idKey] = i;
        return ret;
      };

      var markers = [];
      markers.push({
        latitude: myLat,
        longitude: myLong,
        username: 'home',
        icon: '/images/getmarker.png',
        id: 0
      });

      $scope.tweets.forEach(function(tweet, i) {
        markers.push(createMarker(i+1, tweet))
      });

      $scope.markers = markers;
    }

    //$http.get('/tw/search?q=%20&geocode=37.962564,23.730174,1km&count=20').success(function(data) {
    //  console.log(data);
    //}).error(function(err) {
    //  console.log(err);
    //});
  });
