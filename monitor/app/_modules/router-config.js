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
    .config(['$stateProvider', '$urlRouterProvider', RouterConfig]);

  function RouterConfig($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/sensors');

    $stateProvider
      .state('sensors', {
        url: '/sensors',
        templateUrl: '_modules/views/card-sensor/card-sensor-controller.html',
        controller: 'CardSensorController'
      });
  }

} ());