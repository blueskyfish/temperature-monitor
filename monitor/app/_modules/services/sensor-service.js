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
    .factory('SensorService', ['$http', '$q', 'MathService', SensorService]);

  function SensorService($http, $q, mathService) {

    return {

      getSensorList: function () {
        return _getSensorList();
      }
    };

    function _getSensorList() {
      var defer = $q.defer();
      
      $http.get('/temo/viewer/info')
        .success(function (result) {
          if (result && result.status === 'okay') {
            var list = [];
            angular.forEach(result.sensors, function (sensor) {
              sensor.temperature = "d°".replace(/d/, mathService.round(sensor.temperature / 100, -1)).replace(/\./, ',');
              sensor.humidity = mathService.round(sensor.humidity / 100, 0) + ' %';
              list.push(sensor);
            });
            defer.resolve(list);
          }
          // defer.reject() ???
        })
        .error(function (reason) {
          // TODO
        });

      return defer.promise;
    }
  }

} ());
