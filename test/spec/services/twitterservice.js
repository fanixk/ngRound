'use strict';

describe('Service: twitterService', function () {

  // load the service's module
  beforeEach(module('ngRoundApp'));

  // instantiate service
  var twitterService,
    http;

  beforeEach(inject(function (_twitterService_, $httpBackend) {
    twitterService = _twitterService_;
    http = $httpBackend;
  }));

  //it('should do something', function () {
  //  expect(!!twitterService).toBe(true);
  //});
  //
  //it('should return an array of tweets when search is called', function(done) {
  //  var testTweets = function(tweets) {
  //    expect(tweets instanceof Array).toBeTrue();
  //    expect(tweets[0].text).toBeDefined();
  //    expect(tweets[0].user.screen_name).toBeDefined();
  //  };
  //
  //  var failTest = function(error) {
  //    expect(error).toBeUndefined();
  //  };
  //
  //  http.expectGET('/tw/search?q=&geocode=1,1,1km&count=10').respond(200);
  //
  //  twitterService.search({lat: 1, long: 1, radius: 1, count: 10})
  //    .then(testTweets)
  //    .catch(failTest)
  //    .finally(done);
  //
  //  http.flush();
  //});

});
