
# Sensor Server

This is the rest server, written in PHP with the slim framework, collecting the
sensor data.

## Installation

There are some steps

### Configuration

* The application needs a config file.
* Under `app/config/` is the file `config.example.php`.
* Make a copy from the example config. The name of the config file must be the same as the target of the distribution.

```
$ cd app/config
$ cp config.example.php test.config.php
$ nano test.config.php
```

### Distribute

For the distribution on the server there is Gulp task. The first time, the dependencies of Gulp must be installed with `npm install`.

Open the terminal and enter:

```
$ gulp build --target=name
```

The parameter `target` is required. It is the name of the server.

### Setup the Rewrite rules

Change in the file `.htaccess` the **RewriteBase** value.

```
RewriteEngine On
RewriteBase /temo/

RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule ^ index.php [QSA,L]
```


### Copy on server

The destribution is in the folder `dist`. Copy this on the http server.

## Interface Sensor uploading

An external sensor reader uploads his sensor data.

### Sensor upload

**Request:**

```
POST: /sensor/upload
```

**Body**

```js
{
  "groupd_id":   "{number}",
  "name_id":     "{number}",
  "temperature": "{number}",
  "humidity":    "{number}",
  "date":        "{string: yyyy-mm-dd HH:mm:ss}"
}
```

**Response**

```js
{
  "status": "okay",
  "id":     "{number}",
}
```



## Interface Request

A sensor has a rule. A user has a list of rules. If the user contains the sensor rule, then the user can request information about this sensor.

> If the sensor has the rule **public**, then everybody can request the information about this sensor.

### Request the sensor list

The first request to the server is getting information about the sensor list.

**Request:**

```
GET: /sensor/info
```

**Repsonse**:

```js
{
  status: "okay",
  sensors: [
    {
      url: '/sensor/id',
      name: 'string',
      description: 'string',
      icon: 'string'
    }
  ]
}
```
