'use strict';

describe('Controller: BuddiesCtrl', function () {

  // load the controller's module
  beforeEach(module('lightApp'));

  var BuddiesCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    BuddiesCtrl = $controller('BuddiesCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
