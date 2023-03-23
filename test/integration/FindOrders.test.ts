import FindOrders from "../../src/application/query/find-order/FindOrders";
import MySqlConnectionAdapter from "../../src/infra/database/MySqlConnectionAdapter";

let findOrders: FindOrders;

const connection = new MySqlConnectionAdapter({
  database: "db",
  host: "localhost",
  port: "3307",
  user: "root",
  password: "root",
});

beforeEach(async () => {
  findOrders = new FindOrders(connection);
});

test("should return order list", async () => {
  const output = await findOrders.execute();
  expect(output.orders.length).toBeGreaterThan(1);
});

afterAll(async () => {
  await connection.disconnect();
})