'use strict';

describe('Directive: dnrscroll', function () {

  // load the directive's module
  beforeEach(module('lightApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<dnrscroll></dnrscroll>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the dnrscroll directive');
  }));
});
