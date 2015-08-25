
# Sensor Reader

## Start

Start the reader application:

```
$ node reader.js [--config=path/to/config.js] [--help] [--level=xxx]
```

## Arguments

The program arguments are optional.

name               | description
-------------------|-----------------------------
 config            | the filename of the configuration. If not present, then it use "config.js"
help               | shows the usage of the application
level              | set the log level


## Config File

The configuration for all parameters is in a js file. If the parameter `config` is not present, then it is looking for the file in the current folder.

property           | description
-------------------|-----------------------------
level.namespaces   | a key / value map (key = namespace, value = log level)
level.separator    | the separator in the namespace.
sensor.groupId     | the sensor group id
database.name      | the database name
database.host      | the host of the database server
database.port      | the port of the database server
database.user      | the user of the database
database.pass      | the password of the database user
server.url         | the url of the rest server (http://domain/path/server/upload)
port.name          | the filename of the serial port
port.baudrate      | the baudrate for reading the sensor raw data
port.separator     | the line separator
