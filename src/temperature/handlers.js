const sensor = require('node-dht-sensor');


//function to read temp and humidity from dht sensor
var readSensor = function(DATA_PIN, SENSOR_TYPE, callback){
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
} //end function.



module.exports.readSensor = readSensor;

