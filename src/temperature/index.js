const handlers = require('./handlers');

exports.temperatureSensor = function(pin, sensorType) {
    console.log('===== start temperature and humidity sensor =====');
    setInterval(function() {
        handlers.readSensor(pin, sensorType, function(error, data){
	    if (error)
        	console.log(error);
    	    else {
      		console.log("temperatureSensor(Celsius) data: ", data)
    	    }
	});
 
     }, 1000);

}
