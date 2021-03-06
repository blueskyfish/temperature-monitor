--
-- temperature-monitor - http://github.com/blueskyfish/temperature-monitor.git
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
-- Tabellenstruktur für Tabelle `sensor-currents`
--

DROP TABLE IF EXISTS `sensor-currents`;
CREATE TABLE IF NOT EXISTS `sensor-currents` (
  `group_id` int(11) NOT NULL,
  `name_id` int(11) NOT NULL,
  `temperature` int(11) NOT NULL DEFAULT '0' COMMENT 'current temperature from sensor',
  `humidity` int(11) NOT NULL DEFAULT '0' COMMENT 'current humidity from sensor',
  `date` datetime NOT NULL DEFAULT '1970-01-01 00:00:00' COMMENT 'the last timestamp'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='(temperature monitoring) the current temperature and humidity';

--
-- Daten für Tabelle `sensor-currents`
--

INSERT INTO `sensor-currents` (`group_id`, `name_id`, `temperature`, `humidity`, `date`) VALUES
(1000, 0, 0, 0, '1970-01-01 00:00:00');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `sensor-hasher`
--

DROP TABLE IF EXISTS `sensor-hasher`;
CREATE TABLE IF NOT EXISTS `sensor-hasher` (
  `hash_key` varchar(60) NOT NULL,
  `salt` varchar(60) NOT NULL,
  `pin` varchar(20) NOT NULL,
  `enabled` enum('Y','N') NOT NULL DEFAULT 'Y'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='(temperature-monitor) The generated hashes';

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `sensor-hasher-rules`
--

DROP TABLE IF EXISTS `sensor-hasher-rules`;
CREATE TABLE IF NOT EXISTS `sensor-hasher-rules` (
  `hash_key` varchar(60) NOT NULL,
  `rule_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='(temperature monitoring) link table between hasher and rules';

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `sensor-names`
--

DROP TABLE IF EXISTS `sensor-names`;
CREATE TABLE IF NOT EXISTS `sensor-names` (
  `group_id` int(11) NOT NULL,
  `name_id` int(11) NOT NULL COMMENT 'the id of the sensor (range: 0..7)',
  `rule_id` int(240) NOT NULL DEFAULT '1' COMMENT 'the rules for the sensor. FK to `sensor-rules.rule_id`',
  `name` varchar(120) NOT NULL COMMENT 'the name of the sensor',
  `description` varchar(400) NOT NULL COMMENT 'a short description of the sensor',
  `icon` varchar(240) NOT NULL COMMENT 'font awesome icon name'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='(temperature monitoring) the sensor names';

--
-- Daten für Tabelle `sensor-names`
--

INSERT INTO `sensor-names` (`group_id`, `name_id`, `rule_id`, `name`, `description`, `icon`) VALUES
(1000, 0, 1, 'Wohnzimmer', 'Test Sensor im Wohnzimmer', 'fa-user');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `sensor-readers`
--

DROP TABLE IF EXISTS `sensor-readers`;
CREATE TABLE IF NOT EXISTS `sensor-readers` (
  `group_id` int(11) NOT NULL,
  `name` varchar(120) NOT NULL COMMENT 'the name of the sensor reader',
  `description` varchar(400) NOT NULL COMMENT 'a short description',
  `icon` varchar(250) NOT NULL COMMENT 'font awesome icon name'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='(temperature monitoring) the sensor group';

--
-- Daten für Tabelle `sensor-readers`
--

INSERT INTO `sensor-readers` (`group_id`, `name`, `description`, `icon`) VALUES
(1000, 'Sensor 1', 'Test Sensor Reader', 'fa-home');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `sensor-rules`
--

DROP TABLE IF EXISTS `sensor-rules`;
CREATE TABLE IF NOT EXISTS `sensor-rules` (
  `rule_id` int(11) NOT NULL,
  `name` varchar(60) NOT NULL COMMENT 'the name of the rule'
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='(temperature-monitor) the list of rules';

--
-- Daten für Tabelle `sensor-rules`
--

INSERT INTO `sensor-rules` (`rule_id`, `name`) VALUES
(1, 'public');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `sensors`
--

DROP TABLE IF EXISTS `sensors`;
CREATE TABLE IF NOT EXISTS `sensors` (
  `sensor_id` int(11) NOT NULL,
  `group_id` varchar(120) NOT NULL COMMENT 'the group id of the sensor reader',
  `name_id` varchar(120) NOT NULL COMMENT 'the name id of the sensor',
  `temperature` int(11) NOT NULL COMMENT 'The temperature value is multiplied by 100',
  `humidity` int(11) NOT NULL COMMENT 'The humidity value is multiplied by 100',
  `date` datetime NOT NULL,
  `status` enum('SAVED','DELETED') NOT NULL DEFAULT 'SAVED'
) ENGINE=InnoDB AUTO_INCREMENT=1000 DEFAULT CHARSET=utf8 COMMENT='(temperature monitoring) uploaded sensor dates';


--
-- Indizes für die Tabelle `sensor-currents`
--
ALTER TABLE `sensor-currents`
  ADD PRIMARY KEY (`group_id`,`name_id`) USING BTREE;

--
-- Indizes für die Tabelle `sensor-hasher`
--
ALTER TABLE `sensor-hasher`
  ADD PRIMARY KEY (`hash_key`);

--
-- Indizes für die Tabelle `sensor-hasher-rules`
--
ALTER TABLE `sensor-hasher-rules`
  ADD UNIQUE KEY `HASH_RULES` (`hash_key`,`rule_id`);

--
-- Indizes für die Tabelle `sensor-names`
--
ALTER TABLE `sensor-names`
  ADD PRIMARY KEY (`group_id`,`name_id`) USING BTREE;

--
-- Indizes für die Tabelle `sensor-readers`
--
ALTER TABLE `sensor-readers`
  ADD PRIMARY KEY (`group_id`);

--
-- Indizes für die Tabelle `sensor-rules`
--
ALTER TABLE
`sensor-rules`
  ADD PRIMARY KEY (`rule_id`);

--
-- Indizes für die Tabelle `sensors`
--
ALTER TABLE `sensors`
  ADD PRIMARY KEY (`sensor_id`),
  ADD KEY `SENSOR` (`group_id`,`name_id`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `sensor-rules`
--
ALTER TABLE `sensor-rules`
  MODIFY `rule_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT für Tabelle `sensors`
--
ALTER TABLE `sensors`
  MODIFY `sensor_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=16;SET FOREIGN_KEY_CHECKS=1;

COMMIT;
