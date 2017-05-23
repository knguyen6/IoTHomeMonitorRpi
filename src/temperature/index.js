const handlers = require('./handlers');

exports.temperatureSensor = function() {
    console.log('===== start temperature and humidity sensor =====');
    setInterval(function() {
        handlers.readSensor(function(error, data){
	    if (error)
        	console.log(error);
    	    else {
      		console.log("temperatureSensor(Celsius) data: ", data)
    	    }
	});
 
     }, 1000);

}
