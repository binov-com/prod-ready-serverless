const Responses = require("../common/API_Responses");
const S3 = require("../common/S3");

const bucket = process.env.bucketName;

exports.handler = async (event) => {
  console.log("event", event);

  if (!event.pathParameters || !event.pathParameters.fileName) {
    // failed without an fileName
    return Responses._400({ message: "Missing the ID from path" });
  }

  const fileName = event.pathParameters.fileName;

  const response = await S3.get(fileName, bucket).catch((err) => {
    console.log("Error in S3 Get", err);
    return null;
  });

  if (!response) {
    return Responses._400({ message: "Failed to read data by filename" });
  }

  return Responses._200({ response });
};
