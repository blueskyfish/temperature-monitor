/*
 * temperature-monitor - http://github.com/blueskyfish/temperature-monitor.git
 *
 * The MIT License (MIT)
 * Copyright (c) 2015 BlueSkyFish
 *
 * Distributed on "<%= datetime %> @ <%= target %>" in version <%= version %>
 */

'use strict';

module.exports = {

  HTTP_OKAY: 200,

  HTTP_BAD_REQUEST: 400,

  getCode: function (statusCode) {
    return parseInt(statusCode, 10);
  }
};
