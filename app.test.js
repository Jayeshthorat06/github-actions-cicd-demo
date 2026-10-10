const test = require("node:test");
const assert = require("node:assert/strict");
const app = require("./app");

test("GET / returns the application message", async (t) => {
  const server = app.listen(0);
  await new Promise((resolve) => server.once("listening", resolve));

  t.after(() => new Promise((resolve, reject) => {
    server.close((error) => error ? reject(error) : resolve());
  }));

  const address = server.address();
  const response = await fetch(`http://127.0.0.1:${address.port}/`);
  const body = await response.json();

  assert.equal(response.status, 200);
  assert.equal(body.message, "CI/CD pipeline is Checking Rollback!");
});

test("GET /health returns UP", async (t) => {
  const server = app.listen(0);
  await new Promise((resolve) => server.once("listening", resolve));

  t.after(() => new Promise((resolve, reject) => {
    server.close((error) => error ? reject(error) : resolve());
  }));

  const address = server.address();
  const response = await fetch(`http://127.0.0.1:${address.port}/health`);
  const body = await response.json();

  assert.equal(response.status, 200);
  assert.equal(body.status, "UP");
});
