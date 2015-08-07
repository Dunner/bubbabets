'use strict';

describe('Directive: dnrCharacteritem', function () {

  // load the directive's module
  beforeEach(module('lightApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<dnr-characteritem></dnr-characteritem>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the dnrCharacteritem directive');
  }));
});
