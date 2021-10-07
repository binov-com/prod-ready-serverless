const Responses = require("../common/API_Responses");
const Dynamo = require("../common/Dynamo");

const customersTable = process.env.customersTable;

exports.handler = async (event) => {
  console.log("event", event);

  if (!event.pathParameters || !event.pathParameters.ID) {
    // failed without and ID
    return Responses._400({ message: "Missing the ID from path" });
  }

  // let ID = event.pathParameters.ID;
  const customer = JSON.parse(event.body);
  customer.ID = event.pathParameters.ID;

  const newCustomer = await Dynamo.write(customer, customersTable).catch(
    (err) => {
      console.log("Error in Dynamo Write", err);
      return null;
    }
  );

  if (!newCustomer) {
    return Responses._400({ message: "Failed to write user by ID" });
  }

  return Responses._200({ newCustomer });
};
