--
-- temperature-monitor - http://github.com/blueskyfish/temperature-monitor.git
--
-- The MIT License (MIT)
-- Copyright (c) 2015 BlueSkyFish
--

--
-- Update the Tables to Version 0.0.4
--

DROP TABLE IF EXISTS `sensor-currents`;
CREATE TABLE `sensor-currents` (
  `group_id`    INT NOT NULL,
  `name_id`     INT NOT NULL,
  `temperature` INT NOT NULL COMMENT 'current temperature from sensor'  DEFAULT '0',
  `humidity`    INT NOT NULL COMMENT 'current humidity from sensor'  DEFAULT '0'
) ENGINE = InnoDB COMMENT = '(temperature monitoring) the current temperature and humidity';

--
-- Indizes für die Tabelle `sensor-currents`
--
ALTER TABLE `sensor-currents`
ADD PRIMARY KEY (`group_id`,`name_id`) USING BTREE;

--
-- Insert the sensor
--
INSERT INTO `sensor-currents` (`group_id`, `name_id`) VALUES ('1000', '0');


-- ----------------------------------------------------------------------------

--
-- Delete the field `sensor-names.temperature`
--
ALTER TABLE `sensor-names` DROP `temperature`;

--
-- Delete the field `sensor-names.humidity`
--
ALTER TABLE `sensor-names` DROP `humidity`;
