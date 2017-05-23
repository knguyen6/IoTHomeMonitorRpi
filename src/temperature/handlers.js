const sensor = require('node-dht-sensor');

const DATA_PIN = 17;
const SENSOR_TYPE = 11;

//function to read temp and humidity from dht sensor
var readSensor = function(callback){
        var data = {};
        sensor.read(SENSOR_TYPE, DATA_PIN, (err, tmp, humidity) => {
        if (err){
          callback(err);
        }
         else {
           data.temp = tmp;
           data.humidity = humidity;
           callback(null, data);
        }
        }); //end sensor.read
  //return data;
} //end function.



module.exports.readSensor = readSensor;

