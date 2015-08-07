/*global Snap:false */
'use strict';

/**
 * @ngdoc directive
 * @name lightApp.directive:dnrCharacteritem
 * @description
 * # dnrCharacteritem
 */
angular.module('lightApp')
  .directive('dnrCharacteritem', function () {
    return function (scope, element, attrs) {
      var canvas = new Snap(element[0]);
      var el = scope.inventory[attrs.dnrCharacteritem];
      canvas.append(el);
      var node = canvas.select('#'+el.node.id),
          bb = node.getBBox();

      var mScale = new Snap.Matrix();

      var canvasWidth = 744;
      var canvasHeight = 1052;
      var newHeight = ((canvasHeight / bb.height) * bb.height);
      var newWidth = ((canvasWidth / bb.width) * bb.width);
      if (bb.width >  bb.height) {
        mScale.scale(canvasWidth / bb.width, canvasWidth / bb.width);
      } else {
        mScale.scale(canvasHeight / bb.height, canvasHeight / bb.height);
      }
      mScale.translate(-(bb.x)+((canvasWidth-newWidth)), -(bb.y)+((canvasHeight-newHeight)));

      node.transform(mScale);
    };
  });
