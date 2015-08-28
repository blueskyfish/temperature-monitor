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

   angular.module('temoApp').config(['$translateProvider', ConfigTranslate]);

   function ConfigTranslate($translateProvider) {
     $translateProvider.useStaticFilesLoader({
       prefix: 'assets/i18n/locale-',
       suffix: '.json'
     });
     $translateProvider.preferredLanguage('de');
   }

} ());
