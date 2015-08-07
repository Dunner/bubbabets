'use strict';

describe('Service: buddies', function () {

  // load the service's module
  beforeEach(module('lightApp'));

  // instantiate service
  var buddies;
  beforeEach(inject(function (_buddies_) {
    buddies = _buddies_;
  }));

  it('should do something', function () {
    expect(!!buddies).toBe(true);
  });

});
