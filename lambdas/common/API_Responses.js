const Responses = {
  _defineResponse(statusCode = 502, data = {}) {
    return {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Methods": "*",
        "Access-Control-Allow-Origin": "*",
      },
      statusCode: statusCode,
      body: JSON.stringify(data),
    };
  },
  _200(data = {}) {
    return this._defineResponse(200, data);
  },
  _400(data = {}) {
    return this._defineResponse(400, data);
  },
  _404(data = {}) {
    return this._defineResponse(404, data);
  },
};

module.exports = Responses;
