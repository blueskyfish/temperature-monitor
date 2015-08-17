--
-- temperature-monitoring - http://github.com/blueskyfish/temperature-monitoring.git
--
-- The MIT License (MIT)
-- Copyright (c) 2015 BlueSkyFish
--

-- ----------------------------------------------------------------------------

--
-- Update the Table `sensor-names` to Version 0.0.3
--
ALTER TABLE `sensor-names`
  ADD `temperature` INT NOT NULL COMMENT 'current temperature' DEFAULT '0' AFTER `name_id`,
  ADD `humidity` INT NOT NULL COMMENT 'current humidity' DEFAULT '0' AFTER `temperature`;
