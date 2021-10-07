const AWS = require("aws-sdk");

let options = {};
if (process.env.IS_OFFLINE) {
  options = {
    region: "localhost",
    endpoint: "http://localhost:8000",
  };
}

AWS.config.apiVersions = {
  dynamodb: "2012-08-10",
  // other service API versions
};

const documentClient = new AWS.DynamoDB.DocumentClient(options);

const Dynamo = {
  async get(ID, TableName) {
    const params = {
      TableName,
      Key: {
        ID,
      },
    };

    const data = await documentClient.get(params).promise();

    if (!data || !data.Item) {
      console.log(data);
      throw Error(
        `There was an error fetching the data for ID of ${ID} from ${TableName}`
      );
    }

    return data.Item;
  },
  async write(data, TableName) {
    if (!data.ID) {
      throw Error("no ID on the data");
    }

    const params = {
      TableName,
      Item: data,
    };

    const response = await documentClient.put(params).promise();

    if (!response) {
      console.log(response);
      throw Error(
        `There was an error inserting ID of ${data.ID} in table ${TableName}`
      );
    }

    return data;
  },
  async delete(ID, TableName) {
    const params = {
      TableName,
      Key: { ID },
    };

    return documentClient.delete(params).promise();
  },
};

module.exports = Dynamo;
