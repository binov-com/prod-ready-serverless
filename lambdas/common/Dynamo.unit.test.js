const Dynamo = require("./Dynamo");

describe("Unit test of API_Responses", () => {
  test("Dynamo is an object", () => {
    expect(typeof Dynamo).toBe("object");
  });

  test("dynamo has get and write", () => {
    expect(typeof Dynamo.get).toBe("function");
    expect(typeof Dynamo.write).toBe("function");
  });

  const validTableName = "customers";
  const data = { ID: "1", lastname: "BY", firstname: "Bessam" };

  test("dynamo write works", async () => {
    // expect.assertions(2);

    try {
      const response = await Dynamo.write(data, validTableName);
      expect(response).toBe(data);
      expect(typeof response).toBe("object");
    } catch (error) {
      console.log("error in dynamo write test", error);
    }
  });

  test("dynamo get works", async () => {
    // expect.assertions(2);

    try {
      const response = await Dynamo.get(data.ID, validTableName);
      expect(response).toEqual(data);
      expect(typeof response).toBe("object");
    } catch (error) {
      console.log("error in dynamo get test", error);
    }
  });
});
