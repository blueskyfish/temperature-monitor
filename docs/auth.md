
# Temperature Monitor

This unit describes the authentication in the **temo** application.

## Overview

Not all sensor data are public. Some sensors stand in private houses and the data only for
the Mitbewohner.

A sensor is a sensor reader assign. Every sensor has one **rule**.

| Field       | Type        | Description
|-------------|-------------|--------------------
| name_id     | int         | primary key for the sensor (value between 0 and 7).
| group_id    | int         | primary key for the group
| rule_id     | int         | the id of the rule.

The primary key has two fields: `name_id` + `group_id`

The Table `sensor_rules` has the list of all rules.

| Field       | Type        | Description
|-------------|-------------|--------------------
| rule_id     | int         | primary key and auto_increment
| name        | varchar(60) | the name of the rule

The Table `sensor_hasher` contains the hash keys from the uses.

| Field       | Type        | Description
|-------------|-------------|--------------------
| hash_key    | varchar(60) | the unique hash key
| salt        | varchar(60) | the salt of the hash key
| pin         | varchar(20) | the pin of the hash key
| enabled     | 'Y' or 'N'  | enable flag of the hash key

The Table `sensor-hasher-rules` is the link between the user hash and the rules. The user rules
must be equals with the sensor rule.

## Rules

The public rule has the id `1`.


## Get the Sensor Information

```sql
SELECT
	sn.group_id, sn.name_id, sn.name, sn.description, sn.icon,
	sc.temperature, sc.humidity, sc.date
FROM `sensor-names` AS sn
	INNER JOIN `sensor-currents` AS sc ON sn.group_id = sc.group_id AND sn.name_id = sc.name_id
WHERE sn.rule_id = 1 OR sn.rule_id IN (
	SELECT rule_id
	FROM `sensor-hasher-rules` AS shr
		INNER JOIN `sensor-hasher` AS sh ON shr.hash_key = sh.hash_key AND sh.enabled = 'Y'
  	WHERE shr.hash_key = ?
)
```
