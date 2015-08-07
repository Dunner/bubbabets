'use strict';

describe('Service: scroll', function () {

  // load the service's module
  beforeEach(module('lightApp'));

  // instantiate service
  var scroll;
  beforeEach(inject(function (_scroll_) {
    scroll = _scroll_;
  }));

  it('should do something', function () {
    expect(!!scroll).toBe(true);
  });

});
