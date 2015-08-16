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
require('lib/Storage_Sensor.php');

use Slim\Slim;

Slim::registerAutoloader();


/**
 * Calculate the mode!
 *
 * @return string "production" or "deployment"
 */
function getMode() {
    $version = '<%= version %>';
    return strpos($version, 'version') === false ? 'production' : 'deployment';
}


// ----------------------------------------------------------------------------

/** @var \Slim\Slim $app */
$app = config(new Slim(array(
    'mode' => getMode()
)));

//
$app->setName('sensor-server');


//
// Rest Actor: GET [root]/hello
//
$app->get('/hello', function () use ($app) {
    $res = $app->response;
    $result = array(
        'message' => 'Hello World',
        'target' => '<%= target %>',
        'version' => '<%= version %>'
    );
    $res->headers->set('Content-Type', 'application/json');
    echo json_encode($result);
});


//
// Rest Actor: POST [root]/sensor/upload
//
$app->post('/sensor/upload', function () use ($app) {
    $body = $app->request->getBody();
    $sensor = json_decode($body, true);

    $storage = new Storage_Sensor($app);
    $result = $storage->save($sensor);

    $res = $app->response;
    $res->headers->set('Content-Type', 'application/json');
    $res->setBody(json_encode($result));
});

//
// catch errors
//
$app->error(function (\Exception $e) use ($app) {
    $result = array(
        'message' => $e->getMessage(),
        'code' => $e->getCode(),
        'file' => $e->getFile(),
        'line' => $e->getLine(),
        'trace' => $e->getTraceAsString()
    );
    $res = $app->response;
    $res->setStatus(400);
    $res->headers->set('Content-Type', 'application/json');
    $res->setBody(json_encode($result));
});

$app->run();

?>