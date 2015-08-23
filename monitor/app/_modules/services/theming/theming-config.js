/*
 * temperature-monitoring - http://github.com/blueskyfish/temperature-monitor.git
 *
 * The MIT License (MIT)
 * Copyright (c) 2015 BlueSkyFish
 *
 * Distributed on "<%= datetime %> @ <%= target %>" in version <%= version %>
 */

 (function () {

  'use strict';

  angular.module('temoApp').config(['$mdIconProvider', '$mdThemingProvider', ThemingConfig]);

  function ThemingConfig($mdIconProvider, $mdThemingProvider) {

    $mdIconProvider
      .icon('menu', 'assets/images/svg/menu.svg', 24);

    $mdThemingProvider
      .theme('default')
      .primaryPalette('blue')
      .accentPalette('orange');
  }

} ());
