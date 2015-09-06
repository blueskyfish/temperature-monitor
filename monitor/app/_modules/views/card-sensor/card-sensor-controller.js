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
      'SensorService',
      CardSensorController
    ]);

  function CardSensorController($scope, $timeout, swipeVerticalService, sensorService) {

    var self = this;

    $scope.sensorList = [];
    $scope.sensorCurrent = 0;
    $scope.cardLoading = true;
    $scope.sensor = null;

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
        self.loadSensorList(true);
      }
    };

    $scope.changeSensor = function (page) {
      console.log('page "%s" is clicked', page);
      $scope.cardLoading = true;
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
      $timeout(function () {
        self.changeCard(current);
      }, 500);
    };


    self.changeCard = function (current) {
      // adjust the current sensor index!
      var count = $scope.sensorList.length;
      if (current < 1) {
        current = count;
      }
      if (current > count) {
        current = 1;
      }
      $scope.sensor = $scope.sensorList[current - 1];
      $scope.sensorCurrent = current;
      console.log('sensor current %s', current);
      $timeout(function () {
        $scope.cardLoading = false;
      }, 500);
    };

    self.loadSensorList = function (refresh) {
      if (refresh === true) {
        $scope.sensorList = [];
        $scope.sensorCurrent = 0;
        $scope.cardLoading = true;
      }
      sensorService.getSensorList()
        .then(function(sensorList) {
          $scope.sensorList = sensorList;
          self.changeCard(1);
        });
    };

    self.loadSensorList(false);
  }

} ());