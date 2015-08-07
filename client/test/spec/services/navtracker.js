'use strict';

describe('Service: navtracker', function () {

  // load the service's module
  beforeEach(module('lightApp'));

  // instantiate service
  var navtracker;
  beforeEach(inject(function (_navtracker_) {
    navtracker = _navtracker_;
  }));

  it('should do something', function () {
    expect(!!navtracker).toBe(true);
  });

});
