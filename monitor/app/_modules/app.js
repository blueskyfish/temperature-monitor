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

   var
     app = angular.module('temoApp', [
       'ngMaterial',
       'pascalprecht.translate'
     ]);

   app.controller('MainController', ['$scope', '$mdSidenav', MainController]);

   function MainController($scope, $mdSidenav) {

     $scope.toggleSideBar = function () {
       $mdSidenav('left').toggle().then(function () {
         console.log('Tataa');
       });
     };

   }

 } ());
