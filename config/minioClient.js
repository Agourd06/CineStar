const Minio = require('minio');
require('dotenv').config();

const minioClient = new Minio.Client({
    endPoint: process.env.endPoint,
    port: parseInt(process.env.portminio),
    useSSL: false,
    accessKey: process.env.accessKey,
    secretKey: process.env.secretKey
});

minioClient.bucketExists('cinestarmovies', function (err) {
    if (err) {
        return console.log('Bucket does not exist.', err);
    }
    console.log('Bucket exists!');
});

module.exports = minioClient;