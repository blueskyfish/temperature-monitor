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
 * Setup the configuration for the application
 *
 * @param \sensor\Application $app
 * @return \sensor\Application
 */
function config($app) {

    # Configuration for the mode "delelopment"
    $app->configureMode('development', function () use ($app) {
        $app->config(array(
            'debug' => true,
            'database.dsn' => 'mysql:dbname=XXXX;host=localhost;port=3305',
            'database.user' => 'dbuser',
            'database.pass' => 'dbPassword'
        ));
    });

    # Configuration for the mode "production"
    $app->configureMode('production', function () use ($app) {
        $app->config(array(
            'debug' => true,
            'database.dsn' => 'mysql:dbname=XXXXXX;host=localhost;port=3306',
            'database.user' => 'dbUser',
            'database.pass' => 'dbPassword'
        ));
    });

    // need more configuration modes?
    // insert here

    return $app;
}

?>
