'use strict';

/**
 * @ngdoc function
 * @name ngRoundApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the ngRoundApp
 */
angular.module('ngRoundApp')
  .controller('MainCtrl', function ($scope, $rootScope, twitterService, geoLocation, $q, $window) {
    $rootScope.radius = $scope.radius = 3;
    $rootScope.count = $scope.count = 100;
    $scope.tweets = [];
    $scope.markers = [];
    $rootScope.loader = true;

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
        radius: $scope.radius || 1,
        count: $scope.count || 100
      }).then(_buildTweets);

      deferred.resolve(promise);
      return deferred.promise;
    }

    function _buildTweets(data) {
      $scope.tweets = data.statuses.map(function(tweet) {
        return {
          name: tweet.user.name,
          username: tweet.user.screen_name,
          text: tweet.text,
          coordinates: tweet.coordinates.coordinates
        };
      });
    }

    function _buildMap() {
      var myLat = $scope.coords.lat;
      var myLong = $scope.coords.long;

      var createMarker = function(i, tweet) {
        return {
          id: i,
          latitude: tweet.coordinates[1],
          longitude: tweet.coordinates[0],
          username: tweet.username,
          tweet: tweet.text
        };
      };

      var markers = [];
      markers.push({
        id: 0,
        latitude: myLat,
        longitude: myLong,
        username: 'home',
        icon: '/images/getmarker.png'
      });

      $scope.tweets.forEach(function(tweet, i) {
        markers.push(createMarker(i+1, tweet));
      });

      $scope.markers = markers;

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
            _openWindow(model);
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

      $scope.circles = [
        {
          id: 1,
          center: {
            latitude: myLat,
            longitude: myLong
          },
          radius: $scope.radius * 1000,
          stroke: {
            color: '#08B21F',
            weight: 2,
            opacity: 1
          },
          fill: {
            color: '#08B21F',
            opacity: 0.5
          },
          visible: true, // optional: defaults to true
          control: {}
        }
      ];
    }

    $scope.focusMarker = function(tweet, index) {
      var markers = $scope.markers;
      $scope.selectedTweet = index;

      var selectedTweet = _.find(markers, function(tw) {
        return (tw.latitude === tweet.coordinates[1]) && (tw.longitude === tweet.coordinates[0]);
      });

      $scope.map.center = {
        latitude: selectedTweet.latitude,
        longitude: selectedTweet.longitude
      };

      _openWindow(selectedTweet);
      $window.scrollTo(0,0);
    };

    function _openWindow(model) {
      $scope.map.window.model = model;
      $scope.map.window.username = model.username;
      $scope.map.window.tweet = model.tweet;
      $scope.map.window.show = true;
    }

    $rootScope.$watch('radius', function(newValue, oldValue) {
      if(newValue !== oldValue) {
        $scope.radius = $rootScope.radius;
        _doSearch().then(_buildMap);
      }
    });

    $rootScope.$watch('count', function(newValue, oldValue) {
      if(newValue !== oldValue) {
        $scope.count = $rootScope.count;
        _doSearch().then(_buildMap);
      }
    });

  });
