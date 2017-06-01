var AWS = require('aws-sdk');
var config = require('./config.js')

// get reference to S3 client
var s3 = new AWS.S3(config.S3_BUCKET);
const s3Region = config.S3_BUCKET.region;
exports.handler = (event, context, callback) => {

    var url = "";
    //extract object key out of event object
    if(event && event.Records.length && event.Records[0] && event.Records[0].Sns) {
        const msg = JSON.parse(event.Records[0].Sns.Message);
        if(msg && msg.Records.length ){
            const s3Obj = msg.Records[0].s3;
            url = 'https://s3-'+ s3Region +'.amazonaws.com/'+s3Obj.bucket.name+'/'+s3Obj.object.key
            console.log("s3's url to send to client: ", url );
            callback(null, url)
        } else context.done();
    } else context.done();
//url format: https://s3-{region}.amazonaws.com/{bucket_name}/{key}

}

