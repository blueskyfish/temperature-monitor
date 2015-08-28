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

require_once('lib/Hash_Service.php');

use sensor\shares\DB;
use sensor\shares\Define;
use sensor\shares\HashService;

use Hashids\Hashids;

class SensorProvider
{
  private $app;

  public function __construct($app)
  {
    $this->app = $app;
  }

  public function sendInfo()
  {
    // get the header field "x-monitoring-auth"
    $hashKey = $this->app->getAuthToken();
    $contentPath = $this->app->getContextPath();

    $sensorList = array();

    $sql = 'SELECT
        sn.group_id, sn.name_id, sn.name, sn.description, sn.icon,
        sc.temperature, sc.humidity, sc.date
      FROM `sensor-names` AS sn
        INNER JOIN `sensor-currents` AS sc ON sn.group_id = sc.group_id AND sn.name_id = sc.name_id
      WHERE sn.rule_id = 1 OR sn.rule_id IN
        (SELECT rule_id
          FROM `sensor-hasher-rules` AS shr
            INNER JOIN `sensor-hasher` AS sh ON shr.hash_key = sh.hash_key AND sh.enabled = \'Y\'
          WHERE shr.hash_key = ?)';

    $pdo = DB::openDatabase($this->app);
    $stmt = $pdo->prepare($sql);
    $stmt->execute(array($hashKey));
    while ($row = $stmt->fetch(\PDO::FETCH_ASSOC)) {
      $id = HashService::encode($row['group_id'], $row['name_id']);
      $sensorList[] = array(
        'url'         => "$contentPath/sensor/$id",
        'name'        => $row['name'],
        'description' => $row['description'],
        'icon'        => $row['icon'],
        'temperature' => (int)$row['temperature'],
        'humidity'    => (int)$row['humidity'],
        'date'        => $row['date']
      );
    }

    // build the result object...
    $result = array(
      'status' => Define::RESULT_OKAY,
      'sensors' => $sensorList
    );

    $this->app->sendResult($result);
  }

  public function sendSensor($id)
  {
    list($groupId, $nameId) = HashService::decode($id);

    $result = array(
      'status' => Define::RESULT_ERROR,
      'message' => "Unknown sensor $id",
      'id' => "$groupId - $nameId"
    );
    $this->app->sendResult($result, Define::HTTP_NOT_FOUND);
  }
}

?>
