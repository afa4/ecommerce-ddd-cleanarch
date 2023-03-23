import FindOrderByCode from "../../src/application/query/find-order-by-code/FindOrderByCode";
import MySqlConnectionAdapter from "../../src/infra/database/MySqlConnectionAdapter";

let findOrderByCode: FindOrderByCode;
const connection = new MySqlConnectionAdapter({
  database: "db",
  host: "localhost",
  port: "3307",
  user: "root",
  password: "root",
});

beforeEach(() => {
  findOrderByCode = new FindOrderByCode(connection);
});

test("should find order by code", async () => {
  const result = await findOrderByCode.execute("202100000001");
  expect(result.code).toBe("202100000001");
});

test("should throw error if order is not found", async () => {
  const code = "202900000001";
  await expect(findOrderByCode.execute(code)).rejects.toThrow(
    "Not found"
  );
});

afterAll(async () => {
    await connection.disconnect();
})