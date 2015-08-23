
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
