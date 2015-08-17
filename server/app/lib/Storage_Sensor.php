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

class Storage_Sensor
{
    /**
     * @var \Slim\Slim
     */
    private $app;

    /**
     * @param \Slim\Slim $app
     */
    public function __construct($app)
    {
        $this->app = $app;
    }

    public function save($sensor)
    {
        $data = $this->prepareSensorData($sensor);

        /** @var \PDO $pdo */
        $pdo = openDatabase($this->app);

        $rules = $this->getSensorRules($pdo, $data['groupId'], $data['nameId']);
        // set the current temperature and humidity
        $this->updateSensor($pdo,
          $data['groupId'], $data['nameId'], $data['temperature'], $data['humidity']
        );
        // extends the sensor data
        $data['rules'] = $rules;

        // insert the new record
        $stmt = $pdo->prepare('INSERT INTO `sensors` SET
          `group_id` = :groupId,
          `name_id` = :nameId,
          `rules` = :rules,
          `temperature` = :temperature,
          `humidity` = :humidity,
          `date` = :date'
        );
        $stmt->execute($data);

        # prepare the result: the inserted id
        $id = $pdo->lastInsertId();

        $result = array(
            'id' => $id,
        );
        return $result;
    }

    /**
     * @param \PDO $pdo
     * @param int $groupId
     * @param int $nameId
     * @return string
     */
    private function getSensorRules($pdo, $groupId, $nameId) {
        $stmt = $pdo->prepare('SELECT `rules` FROM `sensor-names`
          WHERE `group_id` = :groupId AND `name_id` = :nameId'
        );
        $stmt->execute(array(
            'groupId' => $groupId,
            'nameId' => $nameId
        ));
        $result = $stmt->fetch(\PDO::FETCH_ASSOC);
        return $result === false ? 'unknown' : $result['rules'];
    }

    private function updateSensor($pdo, $groupId, $nameId, $temperature, $humidity) {
      $stmt = $pdo->prepare('UPDATE `sensor-names` SET
        `temperature` = :temperature,
        `humidity` = :humidity
        WHERE `group_id` = :groupId AND `name_id` = :nameId'
      );
      $stmt->execute(array(
        'groupId'     => $groupId,
        'nameId'      => $nameId,
        'temperature' => $temperature,
        'humidity'    => $humidity
      ));
    }

    private function prepareSensorData($sensor) {
        $data = array();
        // copy all properties to the "data": except "group_id" and "name_id"!
        foreach ($sensor as $name => $value) {
            switch ($name) {
                case 'group_id':
                    $data['groupId'] = $value;
                    break;
                case 'name_id':
                    $data['nameId'] = $value;
                    break;
                default:
                    $data[$name] = $value;
            }
        }
        return $data;
    }
}

?>
