'use strict';

/**
 * @ngdoc function
 * @name ngRoundApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the ngRoundApp
 */
angular.module('ngRoundApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
