'use strict';

describe('Service: geoLocation', function () {

  // load the service's module
  beforeEach(module('ngRoundApp'));

  // instantiate service
  var geoLocation,
    $rootScope,
    $window,
    geolocationErrorMsgs;

  beforeEach(inject(function (_geoLocation_, _$rootScope_,_$window_, _geolocationErrorMsgs_) {
    geoLocation = _geoLocation_;
    $rootScope = _$rootScope_;
    $window = _$window_;
    geolocationErrorMsgs = _geolocationErrorMsgs_;
  }));

  it('should obtain user location', function () {
    var results;
    spyOn($window.navigator.geolocation,"getCurrentPosition").and.callFake(function() {
      var position = { coords: { latitude: 32, longitude: -96 } };
      arguments[0](position);
    });
    geoLocation.getPosition().then(function(data){
      results = data;
    });
    $rootScope.$digest();
    expect(results).toEqual({ coords : { latitude : 32, longitude : -96 } });
  });

  it('should not obtain user location due to rejected permission', function () {
    var results;
    spyOn($rootScope, '$broadcast');
    spyOn($window.navigator.geolocation,"getCurrentPosition").and.callFake(function() {
      var error = {code: 1};
      arguments[1](error);
    });
    geoLocation.getPosition().then(function(){},function(error) {
      results = error;
    });
    $rootScope.$digest();
    expect($rootScope.$broadcast).toHaveBeenCalledWith('error',geolocationErrorMsgs.permissionDenied);
    expect(results).toEqual(geolocationErrorMsgs.permissionDenied);
  });

  it('should not obtain user location if the network is down or the positioning satellites can’t be contacted', function () {
    var results;
    spyOn($rootScope, '$broadcast');
    spyOn($window.navigator.geolocation,"getCurrentPosition").and.callFake(function() {
      var error = {code: 2};
      arguments[1](error);
    });
    geoLocation.getPosition().then(function(){},function(error) {
      results = error;
    });
    $rootScope.$digest();
    expect($rootScope.$broadcast).toHaveBeenCalledWith('error',geolocationErrorMsgs.positionUnavailable);
    expect(results).toEqual(geolocationErrorMsgs.positionUnavailable);
  });

  it('should not obtain user location if it takes too long to calculate the user’s position', function () {
    var results;
    spyOn($rootScope, '$broadcast');
    spyOn($window.navigator.geolocation,"getCurrentPosition").and.callFake(function() {
      var error = {code: 3};
      arguments[1](error);
    });
    geoLocation.getPosition().then(function(){},function(error) {
      results = error;
    });
    $rootScope.$digest();
    expect($rootScope.$broadcast).toHaveBeenCalledWith('error',geolocationErrorMsgs.timeout);
    expect(results).toEqual(geolocationErrorMsgs.timeout);
  });

  it('should not obtain user location due to missing geolocation', function () {
    var results, old_navigator;
    spyOn($rootScope, '$broadcast');
    old_navigator = $window.navigator;
    delete $window.navigator.geolocation;
    geoLocation.getPosition().then(function(){},function(error) {
      results = error;
    });
    $rootScope.$digest();
    expect($rootScope.$broadcast).toHaveBeenCalledWith('error',geolocationErrorMsgs.unsupportedBrowser);
    expect(results).toEqual(geolocationErrorMsgs.unsupportedBrowser);
    $window.navigator = old_navigator;
  });

});
