module.exports = {

    S3_BUCKET: {
        accessKeyId: process.env['S3_KEY'],
        secretAccessKey: process.env['S3_SECRET_KEY'],
        region: process.env['AWS_S3_REGION']
    }
}
