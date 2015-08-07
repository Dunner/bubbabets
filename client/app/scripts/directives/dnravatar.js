/*global Snap:false */
'use strict';

/**
 * @ngdoc directive
 * @name lightApp.directive:dnrAvatar
 * @description
 * # dnrAvatar
 */
angular.module('lightApp')
  .directive('dnrAvatar', function () {
    function link(scope, element) {
      var canvas = new Snap(element[0]);

      function paintCharacter(array) {
        Snap.load('data/character/combined.svg', function (image) {
          canvas.paper.clear();

          function paintE(section) {
            if (section !== undefined) {
              if (section.color !== undefined) {
                if (section.color.length > 2) {
                  var paint = image.select('#' + section.type + '_' + section.name + '_color');
                  if (paint !== null) {paint.attr({'fill': section.color});}
                }
              }
              var el = image.select('#' + section.type + '_' + section.name);
              if (el !== null) {
                el.attr({'z-index': section.zIndex});
                canvas.append(el);
              }
            }
          }

          paintE(array.ears);
          paintE(array.face);
          paintE(array.iris);
          paintE(array.eyes);
          paintE(array.mouth);
          paintE(array.mustache);
          paintE(array.beard);
          paintE(array.nose);
          paintE(array.eyebrows);
          paintE(array.glasses);
          paintE(array.hair);
        });
      }
      if (scope.paperdoll) {
        paintCharacter(scope.paperdoll);
      }

    }
    return {
      restrict: 'A',
      scope: {
        paperdoll: '=paperdoll'
      },
      link: link
    };

  });