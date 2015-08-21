<?php
/*
 * temperature-monitoring - http://github.com/blueskyfish/temperature-monitoring.git
 *
 * The MIT License (MIT)
 * Copyright (c) 2015 BlueSkyFish
 *
 * Distributed on "<%= datetime %> @ <%= target %>" in version <%= version %>
 */

namespace sensor\shares;

class Define
{
  /**
   * Define the http status code "OK"
   */
  const HTTP_OKAY = 200;

  /**
   * Define the http status code "Bad Request"
   */
  const HTTP_BAD_REQUEST = 400;


  const RESULT_OKAY = 'okay';

  const RESULT_ERROR = 'error';
}

?>
