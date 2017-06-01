var AWS = require('aws-sdk');
var config = require('./config.js');
var async = require('async');

// get reference to S3 client
var s3 = new AWS.S3(config.S3_BUCKET);
var sns = new AWS.SNS();

const s3Region = config.S3_BUCKET.region;
exports.handler = (event, context, callback) => {

    async.waterfall([
        function(cb) {
            cb(null, event);
        },
        extractS3ObjectURL
    ], publishToSNS);
//url format: https://s3-{region}.amazonaws.com/{bucket_name}/{key}
}

//extract the bucket name, region, object key to make a url to the object.
//so that user can see the photo on browser.
function extractS3ObjectURL(event, callback) {
    var url = "";
    //extract object key out of event object
    if(event && event.Records.length && event.Records[0] && event.Records[0].Sns) {
        const msg = JSON.parse(event.Records[0].Sns.Message);
        if(msg && msg.Records.length ){
            const s3Obj = msg.Records[0].s3;
            url = 'https://s3-'+ s3Region +'.amazonaws.com/'+s3Obj.bucket.name+'/'+s3Obj.object.key
            console.log("s3's url to send to client: ", url );
        }
        callback(null, url);
    } else callback("No record in SNS event", null);
}

//publish to the SNS topic:
function publishToSNS(error, url) {
    if (error)
        console.log("publishToSNS() error: ", error);
    else {
        console.log("publishToSNS() prepare to publish ....");
        var params = {
          Message: url,
          Subject: 'Detect something !',
          TopicArn: process.env['TO_SNS_TOPIC_ARN']
        };
        sns.publish(params, function(err, data) {
          if (err) console.log(err, err.stack); // an error occurred
          else     console.log("publishToSNS() Successfully publish to SNS topic ", data);           // successful response
        });//sns.publish

    }//else
}

