--
-- temperature-monitor - http://github.com/blueskyfish/temperature-monitor.git
--
-- The MIT License (MIT)
-- Copyright (c) 2015 BlueSkyFish
--

--
-- Update the Tables to Version 0.1.0
--

--
-- Tabellenstruktur für Tabelle `sensor-rules`
--

DROP TABLE IF EXISTS `sensor-rules`;
CREATE TABLE IF NOT EXISTS `sensor-rules` (
  `rule_id` int(11) NOT NULL,
  `name` varchar(60) NOT NULL COMMENT 'the name of the rule'
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='(temperature-monitor) the list of rules';

--
-- Indizes für die Tabelle `sensor-rules`
--
ALTER TABLE `sensor-rules`
  ADD PRIMARY KEY (`rule_id`);

--
-- AUTO_INCREMENT für Tabelle `sensor-rules`
--
ALTER TABLE `sensor-rules`
  MODIFY `rule_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1000;

--
-- Daten für Tabelle `sensor-rules`
--

INSERT INTO `sensor-rules` (`rule_id`, `name`) VALUES(1, 'public');

--
-- Change the field `sensor-names.rules` to `sensor-names.rule_id`
--
ALTER TABLE `sensor-names`
  CHANGE `rules` `rule_id` INT(11) NOT NULL DEFAULT '1'
  COMMENT 'the rules for the sensor. FK to `sensor-rules.rule_id`';

--
-- Delete the field `sensors.rules`
--
ALTER TABLE `sensors` DROP `rules`;

--
-- Update the current sensor
--
UPDATE `sensor-names`
  SET `rule_id` = '1'
WHERE `group_id` = 1000 AND `name_id` = 0;
