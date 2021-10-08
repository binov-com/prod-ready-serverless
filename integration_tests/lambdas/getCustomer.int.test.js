const getCustomer = require("../../lambdas/endpoints/getCustomer");
const eventGenerator = require("../testUtils/eventGenerator");
const validators = require("../testUtils/validators");

const Dynamo = require("../../lambdas/common/Dynamo");

describe("get customer integration tests", () => {
  test("it should take an ID body and return an API Gateway response", async () => {
    const event = eventGenerator({
      pathParametersObject: { ID: "1" },
    });

    const res = await getCustomer.handler(event);

    expect(res).toBeDefined();
    expect(validators.isApiGatewayResponse(res)).toBe(true);
  });

  test("should return a 400 status if we dont pass an ID", async () => {
    const event = eventGenerator({});

    const res = await getCustomer.handler(event);

    expect(res.statusCode).toBe(400);
  });

  test("it should return 404 status code if it is an incorrect ID", async () => {
    const event = eventGenerator({
      pathParametersObject: { ID: "0" },
    });

    const res = await getCustomer.handler(event);

    expect(res.statusCode).toBe(404);
  });

  test("it should return 200 status code when a valid ID", async () => {
    const ID = "1";

    const customer = {
      ID,
      lastname: "Eric",
      firstname: "Dupont",
    };

    const { customersTable } = process.env;

    await Dynamo.write(customer, customersTable);

    const event = eventGenerator({
      pathParametersObject: { ID },
    });

    const res = await getCustomer.handler(event);

    expect(res.statusCode).toBe(200);
    expect(JSON.parse(res.body)).toEqual({ customer });

    await Dynamo.delete(customer.ID, customersTable);
  });
});
