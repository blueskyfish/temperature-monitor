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
    .controller('CardSensorController', [
      '$scope',
      '$timeout',
      'SwipeVerticalService',
      CardSensorController
    ]);

  function CardSensorController($scope, $timeout, swipeVerticalService) {

    var self = this;

    $scope.sensorCount = 3;
    $scope.sensorCurrent = 1;
    $scope.cardLoading = false;


    $scope.swipeLeft = function () {
      console.log('swipe left is enabled!');
      self.changeCard($scope.sensorCurrent - 1);
    };

    $scope.swipeRight = function () {
      console.log('swipe right is enabled!');
      self.changeCard($scope.sensorCurrent + 1);
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
      self.changeCard(current);
    };


    self.changeCard = function (current) {
      if ($scope.cardLoading) {
        return;
      }

      var count = $scope.sensorCount;

      if (current < 1) {
        current = count;
      }
      if (current > count) {
        current = 1;
      }

      $scope.sensorCurrent = current;
      console.log('sensor current %s', current);
      $scope.cardLoading = true;
      $timeout(function () {
        $scope.cardLoading = false;
      }, 500);
    };
  }

} ());