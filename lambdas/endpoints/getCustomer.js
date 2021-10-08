const Responses = require("../common/API_Responses");
const Dynamo = require("../common/Dynamo");

const customersTable = process.env.customersTable;

exports.handler = async (event) => {
  console.log("event", event);

  if (!event.pathParameters || !event.pathParameters.ID) {
    // failed without and ID
    return Responses._400({ message: "Missing the ID from path" });
  }

  let ID = event.pathParameters.ID;

  const customer = await Dynamo.get(ID, customersTable).catch((err) => {
    console.log("Error in Dynamo Get Customer", err);
    return null;
  });

  if (!customer) {
    return Responses._404({ message: "Failed to get user by ID" });
  }

  return Responses._200({ customer });
};
