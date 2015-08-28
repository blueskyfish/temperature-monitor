SELECT sn.group_id, sn.name_id, sn.name, sn.description, sn.icon,
	sc.temperature, sc.humidity, sc.date
FROM `sensor-names` AS sn
  INNER JOIN `sensor-currents` AS sc ON sn.group_id = sc.group_id AND sn.name_id = sc.name_id
WHERE sn.rule_id = 1 OR sn.rule_id IN
  (SELECT rule_id FROM `sensor-hash` WHERE hash_id = 'cd284dbaa5e1fd72dbc02a67fc49e2c9476fb627');




SELECT
  sn.group_id, sn.name_id, sn.name, sn.description, sn.icon,
  sc.temperature, sc.humidity, sc.date
FROM `sensor-names` AS sn
  INNER JOIN `sensor-currents` AS sc ON sn.group_id = sc.group_id AND sn.name_id = sc.name_id


SELECT s.date, s.group_id, s.name_id,
	ROUND(AVG(s.temperature)) AS temperature, MIN(s.temperature) AS min_temparature, MAX(s.temperature) AS max_temperature,
    ROUND(AVG(s.humidity)) AS humidity, MIN(s.humidity) AS min_humidity, MAX(s.humidity) AS max_humidity
FROM (
	SELECT FROM_UNIXTIME(UNIX_TIMESTAMP(s.date) - MOD(UNIX_TIMESTAMP(s.date), 1800)) AS date,
    	s.temperature, s.humidity, s.group_id, s.name_id
	FROM `sensors` AS s
	WHERE s.date BETWEEN NOW() AND DATE_SUB(NOW(), INTERVAL 1 DAY)
) AS s
GROUP BY s.date, s.group_id, s.name_id
UNION
SELECT s.date, s.group_id, s.name_id,
	ROUND(AVG(s.temperature)) AS temperature, MIN(s.temperature) AS min_temparature, MAX(s.temperature) AS max_temperature,
    ROUND(AVG(s.humidity)) AS humidity, MIN(s.humidity) AS min_humidity, MAX(s.humidity) AS max_humidity
FROM (
	SELECT FROM_UNIXTIME(UNIX_TIMESTAMP(s.date) - MOD(UNIX_TIMESTAMP(s.date), 14400)) AS date,
    	s.temperature, s.humidity, s.group_id, s.name_id
	FROM `sensors` AS s
	WHERE s.date BETWEEN DATE_SUB(NOW(), INTERVAL 1 DAY) AND DATE_SUB(NOW(), INTERVAL 6 DAY)
) AS s
GROUP BY s.date, s.group_id, s.name_id
ORDER BY date DESC


SELECT s.section, s.date, s.group_id, s.name_id,
	ROUND(AVG(s.temperature)) AS temperature, MIN(s.temperature) AS min_temparature, MAX(s.temperature) AS max_temperature,
  ROUND(AVG(s.humidity)) AS humidity, MIN(s.humidity) AS min_humidity, MAX(s.humidity) AS max_humidity
FROM (
	SELECT 'A' AS section, FROM_UNIXTIME(UNIX_TIMESTAMP(s.date) - MOD(UNIX_TIMESTAMP(s.date), 1800)) AS date,
		s.temperature, s.humidity, s.group_id, s.name_id
	FROM `sensors` AS s
	WHERE s.date BETWEEN DATE_SUB(NOW(), INTERVAL 1 DAY) AND NOW()
) AS s
GROUP BY s.section, s.date, s.group_id, s.name_id
UNION
SELECT s.section, s.date, s.group_id, s.name_id,
  ROUND(AVG(s.temperature)) AS temperature, MIN(s.temperature) AS min_temparature, MAX(s.temperature) AS max_temperature,
  ROUND(AVG(s.humidity)) AS humidity, MIN(s.humidity) AS min_humidity, MAX(s.humidity) AS max_humidity
FROM (
	SELECT 'B' AS section, FROM_UNIXTIME(UNIX_TIMESTAMP(s.date) - MOD(UNIX_TIMESTAMP(s.date), 14400)) AS date,
    s.temperature, s.humidity, s.group_id, s.name_id
	FROM `sensors` AS s
	WHERE s.date BETWEEN DATE_SUB(NOW(), INTERVAL 2 DAY) AND DATE_SUB(NOW(), INTERVAL 1 DAY)
) AS s
GROUP BY s.section, s.date, s.group_id, s.name_id
UNION
SELECT s.section, s.date, s.group_id, s.name_id,
  ROUND(AVG(s.temperature)) AS temperature, MIN(s.temperature) AS min_temparature, MAX(s.temperature) AS max_temperature,
  ROUND(AVG(s.humidity)) AS humidity, MIN(s.humidity) AS min_humidity, MAX(s.humidity) AS max_humidity
FROM (
	SELECT 'C' AS section, FROM_UNIXTIME(UNIX_TIMESTAMP(s.date) - MOD(UNIX_TIMESTAMP(s.date), 28800)) AS date,
    s.temperature, s.humidity, s.group_id, s.name_id
	FROM `sensors` AS s
	WHERE s.date BETWEEN DATE_SUB(NOW(), INTERVAL 4 DAY) AND DATE_SUB(NOW(), INTERVAL 2 DAY)
) AS s
GROUP BY s.section, s.date, s.group_id, s.name_id
ORDER BY date DESC;
