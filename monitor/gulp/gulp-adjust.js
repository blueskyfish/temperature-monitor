/*
 * temperature-monitor - http://github.com/blueskyfish/temperature-monitor.git
 *
 * The MIT License (MIT)
 * Copyright (c) 2015 BlueSkyFish
 *
 * Distributed on "<%= datetime %> @ <%= target %>" in version <%= version %>
 */

'use strict';

/**
 * @name adjust
 * @description
 * Adjust a given parameter. If the first argument in the array of the second argument, then it
 * is valid, otherwise the first value of the array is returned.
 *
 * @param {*} the value
 * @param {Array<*>} the possible values
 * @return {*}
 */
module.exports = function (value, enums) {
  if (enums.indexOf(value) < 0) {
    return enums[0];
  }
  return value;
};
