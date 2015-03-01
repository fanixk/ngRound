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
      baseUrl: '/tw/search?q=&geocode=',

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
        this.url = this.baseUrl + geocode.lat + ',' + geocode.long + ',' + geocode.radius + 'km&count=20';
      }
    };

    return service;
  });
