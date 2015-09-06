/*
 * temperature-monitor - http://github.com/blueskyfish/temperature-monitor.git
 *
 * The MIT License (MIT)
 * Copyright (c) 2015 BlueSkyFish
 *
 * Distributed on "<%= datetime %> @ <%= target %>" in version <%= version %>
 */

(function () {

  'use strict';

  angular
    .module('howarm')
    .controller('CardSensorController', ['$scope', 'SwipeVerticalService', CardSensorController]);

  function CardSensorController($scope, swipeVerticalService) {

    $scope.sensorCount = 3;
    $scope.sensorCurrent = 1;


    $scope.swipeLeft = function () {
      console.log('swipe left is enabled!');
    };

    $scope.swipeRight = function () {
      console.log('swipe right is enabled!');
    };

    $scope.swipeUp = function (ev) {
      if (swipeVerticalService.isSwipeUpper(ev)) {
        console.log('swipe upper is enabled!');
      }
    };

    $scope.swipeDown = function (ev) {
      if (swipeVerticalService.isSwipeDown(ev)) {
        console.log('swipe down is enabled!');
        // TODO
      }
    };

    $scope.changeSensor = function (page) {
      console.log('page "%s" is clicked', page);

      var current = $scope.sensorCurrent;
      var count = $scope.sensorCount;

      switch (page) {
        case 'left':
          current = current - 1;
          break;
        case 'right':
          current = current + 1;
          break;
        default:
          try {
            current = parseInt(page, 10);
          } catch (e) {
            console.warn('value "%s" is not a number', page);
          }
          break;
      }
      if (current < 1) {
        current = count;
      }
      if (current > count) {
        current = 1;
      }
      $scope.sensorCurrent = current;
      console.log('sensor current %s', current);
    };

  }

} ());