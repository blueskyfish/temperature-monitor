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

  /**
   * @ngdoc directive
   * @name howarm.directive:hwPagination
   * @description
   * This directive shows a pagination of the sensor list.
   *
   * It has 2 scope properties for the sensor values and one event for the click on an page item.
   *
   * ```js
   * $scope.changePage = function (page, event) {}
   * ```
   *
   * ```html
   * &lt;hw-pagination
   *   page-count="sensorCount"
   *   page-current="sensorCurrent"
   *   item-click="changePage(page, event)"&gt;
   * &lt;/hw-pagination&gt;
   * ```
   */
  angular
    .module('howarm')
    .directive('hwPagination', [PaginationWidget]);

  function PaginationWidget() {

    return {
      restrict: 'E',
      replace: true,
      template: '<section class="pagination"><ul class="pagination-list"></ul></section>',
      scope: {
        pageCount: '=',
        pageCurrent: '=',
        itemClick: '&'
      },
      link: linkPagination
    };

    function linkPagination($scope, element) {

      // if the value is "false" then the $scope.$watch('pageCurrent')
      // can not work correctly
      var hasPageItems = false;

      var list = angular.element(element).find('.pagination-list');

      function clickOnPage(ev) {
        var pageItem = angular.element(ev.target);
        var page = pageItem.attr('data-page');
        $scope.$apply(function () {
          $scope.itemClick({
            page: page,
            $event: ev
          });
        });
      }

      $scope.$watch('pageCount', function (newValue) {
        if (!newValue) {
          return;
        }

        // unregister the click events
        list.find('li').off('click', clickOnPage);
        hasPageItems = false;

        if (newValue === 0) {
          list.html('<li class="pagination-list-page">-</li>');
          return;
        }
        // build the page items
        var buffer = '<li class="pagination-list-page" data-page="left">&lt;</li>';
        for (var page = 1; page <= newValue; page++) {
          buffer += ('<li class="pagination-list-page" data-page="'
            + page + '">' + page + '</li>');
        }
        buffer += '<li class="pagination-list-page" data-page="right">&gt;</li>';
        list.html(buffer);
        list.find('li').on('click', clickOnPage);
        hasPageItems = true;
        list.find('[data-page=' + $scope.pageCurrent + ']').addClass('active');
      });

      $scope.$watch('pageCurrent', function (newValue, oldValue) {
        if (!newValue) {
          return;
        }
        if (hasPageItems) {
          list.find('[data-page=' + oldValue + ']').removeClass('active');
          list.find('[data-page=' + newValue + ']').addClass('active');
        }
      });
    }
  }

} ());
