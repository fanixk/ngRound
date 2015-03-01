'use strict';

/**
 * @ngdoc overview
 * @name ngRoundApp
 * @description
 * # ngRoundApp
 *
 * Main module of the application.
 */
angular
  .module('ngRoundApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'uiGmapgoogle-maps'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .config(function(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
      v: '3.17',
      libraries: 'geometry,visualization'
    });
  })
  .factory('httpInterceptor', http_interceptor)
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('httpInterceptor');
  });

function http_interceptor($q, $rootScope, $injector) {
  var _http = null;

  return {
    request: function(config) {
      // Show loader
      $rootScope.loader = true;
      return config || $q.when(config);
    },
    response: function(response) {
      _http = _http || $injector.get('$http');

      if (_http.pendingRequests.length < 1) {
        // Hide loader
        $rootScope.loader = false;
      }

      return response || $q.when(response);
    },
    responseError: function(response) {
      _http = _http || $injector.get('$http');

      if (_http.pendingRequests.length < 1) {
        // Hide loader
        $rootScope.loader = false;
      }

      return $q.reject(response);
    }
  };
}
