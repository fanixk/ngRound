'use strict';

describe('Service: twitterService', function () {

  // load the service's module
  beforeEach(module('ngRoundApp'));

  // instantiate service
  var twitterService;
  beforeEach(inject(function (_twitterService_) {
    twitterService = _twitterService_;
  }));

  it('should do something', function () {
    expect(!!twitterService).toBe(true);
  });

});
