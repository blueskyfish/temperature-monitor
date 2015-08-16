--
-- temperature-monitoring - http://github.com/blueskyfish/temperature-monitoring.git
--
-- The MIT License (MIT)
-- Copyright (c) 2015 BlueSkyFish
--
-- CREATE DATABASE `temo-server` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
--

SET FOREIGN_KEY_CHECKS=0;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";

--
-- Datenbank: `temo-server`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `sensor-uploaded`
--

DROP TABLE IF EXISTS `sensors`;
CREATE TABLE IF NOT EXISTS `sensors` (
  `sensor_id`   int(11) NOT NULL,
  `group_id`    varchar(120) NOT NULL COMMENT 'the group id of the sensor reader',
  `name_id`     varchar(120) NOT NULL COMMENT 'the name id of the sensor',
  `rules`       varchar(240) NOT NULL DEFAULT 'public' COMMENT 'a comma separated list of rules',
  `temperature` int(11) NOT NULL COMMENT 'The temperature value is multiplied by 100',
  `humidity`    int(11) NOT NULL COMMENT 'The humidity value is multiplied by 100',
  `date`        datetime NOT NULL,
  `status`      enum('SAVED','DELETED') NOT NULL DEFAULT 'SAVED'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='(temperature monitoring) uploaded sensor dates';

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `sensor-uploaded`
--
ALTER TABLE `sensors`
  ADD PRIMARY KEY (`sensor_id`),
  ADD KEY `SENSOR` (`group_id`,`name_id`);


--
-- AUTO_INCREMENT für Tabelle `sensors`
--
ALTER TABLE `sensors`
  MODIFY `sensor_id` int(11) NOT NULL AUTO_INCREMENT;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `sensor-readers`
--

DROP TABLE IF EXISTS `sensor-readers`;
CREATE TABLE `sensor-readers` (
  `group_id`    int(11) NOT NULL,
  `name`        varchar(120) NOT NULL COMMENT 'the name of the sensor reader',
  `description` varchar(400) NOT NULL COMMENT 'a short description',
  `icon`        varchar(250) NOT NULL COMMENT 'font awesome icon name'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='(temperature monitoring) the sensor group';

--
-- Indizes für die Tabelle `sensor-readers`
--
ALTER TABLE `sensor-readers`
ADD PRIMARY KEY (`group_id`);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `sensor-names`
--

DROP TABLE IF EXISTS `sensor-names`;
CREATE TABLE `sensor-names` (
  `group_id`    int(11) NOT NULL,
  `name_id`     int(11) NOT NULL COMMENT 'the id of the sensor (range: 0..7)',
  `rules`       varchar(240) NOT NULL DEFAULT 'public' COMMENT 'the rules for the sensor',
  `name`        varchar(120) NOT NULL COMMENT 'the name of the sensor',
  `description` varchar(400) NOT NULL COMMENT 'a short description of the sensor',
  `icon`        varchar(240) NOT NULL COMMENT 'font awesome icon name'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='(temperature monitoring) the sensor names';

--
-- Indizes für die Tabelle `sensor-names`
--
ALTER TABLE `sensor-names`
ADD PRIMARY KEY (`group_id`,`name_id`) USING BTREE;



--
-- Daten für Tabelle `sensor-readers`
--

INSERT INTO `sensor-readers` (`group_id`, `name`, `description`, `icon`) VALUES(1000, 'Sensor 1', 'Test Sensor Reader', 'fa-home');

--
-- Daten für Tabelle `sensor-names`
--

INSERT INTO `sensor-names` (`group_id`, `name_id`, `rules`, `name`, `description`, `icon`) VALUES(1000, 0, 'public', 'Wohnzimmer', 'Test Sensor im Wohnzimmer', 'fa-user');


COMMIT;
