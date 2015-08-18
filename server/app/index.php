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

require('Slim/Slim.php');

require('config/config.php');

require('lib/Utils.php');

require('lib/Application.php');
require('lib/Exception_Middleware.php');
require('lib/Storage_Sensor.php');

use Slim\Slim;


// ----------------------------------------------------------------------------

/** @var \sensor\Application $app */
$app = config(new Application());

// Application Name
$app->setName('sensor-server');


//
// Rest Actor: GET [root]/hello
//
$app->get('/hello', function () use ($app) {
    $result = array(
      'status' => 'okay',
      'message' => 'Hello World',
      'target' => '<%= target %>',
      'version' => '<%= version %>'
    );
    $app->sendResult($result);
});


//
// Rest Actor: POST [root]/sensor/upload
//
$app->post('/sensor/upload', function () use ($app) {
    $sensor = $app->getBodyJson();

    $storage = new Storage_Sensor($app);
    $storage->save($sensor);
});

//
// catch errors
//
$app->error(function (\Exception $e) use ($app) {
    $result = array(
        'status'  => 'error',
        'message' => $e->getMessage(),
        'code' => $e->getCode(),
        'file' => $e->getFile(),
        'line' => $e->getLine(),
        'trace' => $e->getTraceAsString()
    );
    $app->sendResult($result, 400);
});

//
// Execution
//
$app->run();

?>
