'use strict';

describe('Service: geoLocation', function () {

  // load the service's module
  beforeEach(module('ngRoundApp'));

  // instantiate service
  var geoLocation;
  beforeEach(inject(function (_geoLocation_) {
    geoLocation = _geoLocation_;
  }));

  it('should do something', function () {
    expect(!!geoLocation).toBe(true);
  });

});
