import FindOrders from "../../src/application/query/find-order/FindOrders";
import MySqlConnectionAdapter from "../../src/infra/database/MySqlConnectionAdapter";

let findOrders: FindOrders;

const connection = MySqlConnectionAdapter.startDefault();

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