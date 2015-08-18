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
 * Define the http status code "OK"
 */
define('HTTP_OKAY', 200);

/**
 * Define the http status code "Bad Request"
 */
define('HTTP_BAD_REQUEST', 400);

/**
 * Open a database connection
 *
 * @param \Slim\Slim $app
 * @return \PDO
 */
function openDatabase($app) {
    $dsn =  $app->config('database.dsn');
    $user = $app->config('database.user');
    $pass = $app->config('database.pass');
    return new \PDO($dsn, $user, $pass);
}

?>
