const createCustomer = require("../../lambdas/endpoints/createCustomer");
const eventGenerator = require("../testUtils/eventGenerator");
const validators = require("../testUtils/validators");

describe("create customer integration tests", () => {
  test("it should take a body and return an API Gateway response", async () => {
    const event = eventGenerator({
      body: {
        firstname: "Raja",
        lastname: "Amghar",
      },
    });

    const res = await createCustomer.handler(event);

    expect(res).toBeDefined();
    expect(validators.isApiGatewayResponse(res)).toBe(true);
  });

  test("should return a 200 status code when customer is valid", async () => {
    const event = eventGenerator({
      body: {
        firstname: "Raja",
        lastname: "Amghar",
      },
      pathParametersObject: {
        ID: "1",
      },
    });

    const res = await createCustomer.handler(event);
    const body = JSON.parse(res.body);

    expect(res.statusCode).toBe(200);
    expect(body).toEqual({
      newCustomer: {
        firstname: "Raja",
        lastname: "Amghar",
        ID: "1",
      },
    });
  });
});
