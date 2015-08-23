<?php
/*
 * temperature-monitor - http://github.com/blueskyfish/temperature-monitor.git
 *
 * The MIT License (MIT)
 * Copyright (c) 2015 BlueSkyFish
 *
 * Distributed on "<%= datetime %> @ <%= target %>" in version <%= version %>
 */

namespace sensor\viewer;

use sensor\shares\DB;
use sensor\shares\Define;


class SensorProvider
{
  private $app;

  public function __constructor($app)
  {
    $this->app = $app;
  }

  public function sendInfo()
  {

    $sensorList = array();

    // build the result object...
    $result = array(
      'status' => Define::RESULT_OKAY,
      'sensors' => $sensorList
    );

    $this->app->sendResult($result);
  }
}

?>
