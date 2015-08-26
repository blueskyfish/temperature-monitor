<?php
/*
 * temperature-monitor - http://github.com/blueskyfish/temperature-monitor.git
 *
 * The MIT License (MIT)
 * Copyright (c) 2015 BlueSkyFish
 *
 * Distributed on "<%= datetime %> @ <%= target %>" in version <%= version %>
 */

namespace sensor\admin;

set_include_path('.:../shares');

require_once('Slim/Slim.php');

require_once('config/config.php');

require_once('lib/DB.php');
require_once('lib/Define.php');

require_once('lib/Application.php');

use Slim\Slim;
use sensor\shares\Application;
use sensor\shares\Define;
use sensor\config\Config;


// ----------------------------------------------------------------------------

/** @var \sensor\Application $app */
$app = Config::configure(new Application());

// Application Name
$app->setName('sensor-admin');

$app->get('/request/headers', function () use ($app) {
  $result = array(
    'status' => Define::RESULT_OKAY,
    'fields' => array()
  );

  $headers = $app->request->headers;
  $it = $headers->getIterator();

  while ($it->valid()) {
    $result['fields'][$it->key()] = $it->current();
    $it->next();
  }

  $app->sendResult($result);
});

//
// Execution
//
$app->run();

?>
