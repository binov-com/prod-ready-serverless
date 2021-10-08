const Dynamo = require("./Dynamo");

describe("Unit test of API_Responses", () => {
  test("Dynamo is an object", () => {
    expect(typeof Dynamo).toBe("object");
  });

  test("dynamo has get and write", () => {
    expect(typeof Dynamo.get).toBe("function");
    expect(typeof Dynamo.write).toBe("function");
  });

  const { customersTable } = process.env;
  const data = { ID: "1", lastname: "BY", firstname: "Bessam" };

  test("dynamo write works", async () => {
    try {
      const response = await Dynamo.write(data, customersTable);
      expect(response).toBe(data);
      expect(typeof response).toBe("object");
      await Dynamo.delete(data.ID, customersTable);
    } catch (error) {
      console.log("error in dynamo write test", error);
    }
  });

  test("dynamo get works", async () => {
    try {
      const response = await Dynamo.get(data.ID, customersTable);
      expect(response).toEqual(data);
      expect(typeof response).toBe("object");
    } catch (error) {
      console.log("error in dynamo get test", error);
    }
  });
});
