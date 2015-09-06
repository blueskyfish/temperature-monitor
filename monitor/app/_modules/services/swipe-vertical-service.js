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
    .factory('SwipeVerticalService', [SwipeVerticalService]);


  function SwipeVerticalService() {

    function _isSwipeUpper(ev) {
      var item = angular.element(ev.target);
      return item.hasClass('card-sensor-view');
    }

    function _isSwipeDown(ev) {
      var item = angular.element(ev.target);
      return item.hasClass('card-sensor-name');
    }

    return {
      isSwipeUpper: function (ev) {
        return _isSwipeUpper(ev);
      },

      isSwipeDown: function (ev) {
        return _isSwipeDown(ev);
      }
    };
  }

} ());
