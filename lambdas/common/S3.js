const AWS = require("aws-sdk");

const S3Client = new AWS.S3();

const S3 = {
  async get(fileName, bucket) {
    const params = {
      Bucket: bucket,
      Key: fileName,
    };

    let response = await S3Client.getObject(params).promise();

    if (!response) {
      console.log(response);
      throw Error(`There was an error to get the file.`);
    }

    if (fileName.slice(fileName.length - 4, fileName.length) === "json") {
      response = response.Body.toString();
    }

    return response;
  },
  async write(data, fileName, bucket) {
    const params = {
      Bucket: bucket,
      Body: JSON.stringify(data),
      Key: fileName,
    };

    const response = await S3Client.putObject(params).promise();

    if (!response) {
      console.log(response);
      throw Error(`There was an error writing the file.`);
    }

    return response;
  },
};

module.exports = S3;
