'use strict';

/**
 * @ngdoc service
 * @name ngRoundApp.twitterService
 * @description
 * # twitterService
 * Service in the ngRoundApp.
 */
angular.module('ngRoundApp')
  .service('twitterService', function ($http) {
    $http.defaults.useXDomain = true;

    var service = {
      url: 'https://api.twitter.com/1.1/search/tweets.json?q=&geocode=',

      search: function(geocode) {
        geocode = geocode || {};
        this._setUrl(geocode);

        $http.get(this.url)
          .success(function(data) {
            console.log(data);
          });
      },

      _setUrl: function(geocode) {
        this.url += geocode.long + ',' + geocode.lat + ',' + geocode.radius + 'km' + '&result_type=mixed';
      }
    };

    return service;
  });
