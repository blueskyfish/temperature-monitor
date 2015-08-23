
# Temperature Monitoring Viewer

> An interface to evaluate the sensor data

## Interface Request

A sensor has a rule. A user has a list of rules. If the user contains the sensor rule, then the user can request information about this sensor.

> If the sensor has the rule **public**, then everybody can request the information about this sensor.

### Request the sensor list

The first request to the server is getting information about the sensor list.

**Request:**

```
GET: /viewer/info
```

**Repsonse**:

```js
{
  status: "okay",
  sensors: [
    {
      url:         '/viewer/id',
      name:        '{string}',
      description: '{string}',
      icon:        '{string}'
    }
  ]
}
```
