--
-- temperature-monitoring - http://github.com/blueskyfish/temperature-monitoring.git
--
-- The MIT License (MIT)
-- Copyright (c) 2015 BlueSkyFish
--

--
-- Update the Tables to Version 0.1.1
--


ALTER TABLE `sensor-currents`
  ADD `date` DATETIME NOT NULL
  DEFAULT '1970-01-01 00:00:00'
  COMMENT 'the last timestamp'
  AFTER `humidity`;
