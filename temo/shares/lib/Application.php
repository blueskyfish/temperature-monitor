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

use \Slim\Slim;

use \sensor\shares\Define;

# Auto load the Slim classes.
Slim::registerAutoloader();


/**
 * Calculate the mode!
 *
 * @return string "production" or "deployment"
 */
function getMode() {
    $version = '<%= version %>';
    return strpos($version, 'version') === false ? 'production' : 'development';
}

/**
 *
 */
class Application extends Slim
{
  private static $_INSTANCE;

  public static function getApplication()
  {
    return self::$_INSTANCE;
  }

  public function __construct()
  {
    parent::__construct(array(
      'mode' => getMode()
    ));
    self::$_INSTANCE = $this;
    # add the exception middleware
    $this->add(new Exception_Middleware());
  }

  public function sendResult($result, $statusCode = Define::HTTP_OKAY)
  {
    $res = $this->response;
    $res->headers->set('Content-Type', 'application/json');
    if ($statusCode != Define::HTTP_OKAY) {
      $res->setStatus($statusCode);
    }
    $res->setBody(json_encode($result));
  }

  public function getBodyJson()
  {
    $body = $this->request->getBody();
    return json_decode($body, true);
  }

}

?>
