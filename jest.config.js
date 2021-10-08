module.exports = {
  verbose: true,
  preset: "@shelf/jest-dynamodb",
};

process.env = Object.assign(process.env, {
  customersTable: "customers",
});
