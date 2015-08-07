'use strict';

describe('Directive: dnrCharactercreator', function () {

  // load the directive's module
  beforeEach(module('lightApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<dnr-charactercreator></dnr-charactercreator>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the dnrCharactercreator directive');
  }));
});
