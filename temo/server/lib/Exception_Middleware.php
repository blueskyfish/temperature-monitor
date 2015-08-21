<?php
/*
 * temperature-monitoring - http://github.com/blueskyfish/temperature-monitoring.git
 *
 * The MIT License (MIT)
 * Copyright (c) 2015 BlueSkyFish
 *
 * Distributed on "<%= datetime %> @ <%= target %>" in version <%= version %>
 */

namespace sensor;

/**
 * It catches an exception that thrown during the process.
 */
class Exception_Middleware extends \Slim\Middleware
{

  public function call()
  {
    try {

      $this->next->call();

    } catch (\Exception $e) {
      $result = array(
          'status'  => 'error',
          'message' => $e->getMessage(),
          'code' => $e->getCode(),
          'file' => $e->getFile(),
          'line' => $e->getLine(),
          'trace' => $e->getTraceAsString()
      );
      $this->getApplication()->sendResult($result, HTTP_BAD_REQUEST);
    }
  }
}

?>
