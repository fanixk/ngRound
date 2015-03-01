'use strict';

/**
 * @ngdoc service
 * @name ngRoundApp.twitterService
 * @description
 * # twitterService
 * Service in the ngRoundApp.
 */
angular.module('ngRoundApp')
  .service('twitterService', function ($http, $q) {
    var service = {
      url: 'tw/search?q=&geocode=',

      search: function(geocode) {
        var deferred = $q.defer();

        geocode = geocode || {};
        this._setUrl(geocode);

        $http.get(this.url)
          .success(function(data) {
            deferred.resolve(data);
          }).error(function(err) {
            deferred.reject(err);
          });

        return deferred.promise;
      },

      _setUrl: function(geocode) {
        this.url += geocode.long + ',' + geocode.lat + ',' + geocode.radius + 'km' + '&result_type=mixed';
      }
    };

    return service;
  });
