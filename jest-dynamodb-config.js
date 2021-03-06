module.exports = {
  tables: [
    {
      TableName: "customers",
      AttributeDefinitions: [
        {
          AttributeName: "ID",
          AttributeType: "S",
        },
      ],
      KeySchema: [
        {
          AttributeName: "ID",
          KeyType: "HASH",
        },
      ],
      ProvisionedThroughput: {
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1,
      },
    },
  ],
};
