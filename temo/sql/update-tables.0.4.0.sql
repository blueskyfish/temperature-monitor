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
-- Indizes für die Tabelle `sensor-hasher`
--
ALTER TABLE `sensor-hasher`
  ADD PRIMARY KEY (`hash_key`);

--
-- Indizes für die Tabelle `sensor-hasher-rules`
--
ALTER TABLE `sensor-hasher-rules`
  ADD UNIQUE KEY `HASH_RULES` (`hash_key`,`rule_id`);

COMMIT;
