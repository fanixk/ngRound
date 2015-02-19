'use strict';

describe('Service: geolocationErrorMsgs', function () {

  // load the service's module
  beforeEach(module('ngRoundApp'));

  // instantiate service
  var geolocationErrorMsgs;
  beforeEach(inject(function (_geolocationErrorMsgs_) {
    geolocationErrorMsgs = _geolocationErrorMsgs_;
  }));

  it('should do something', function () {
    expect(!!geolocationErrorMsgs).toBe(true);
  });

});
