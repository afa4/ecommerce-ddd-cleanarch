import PgPromiseConnectionAdapter from "../../src/infra/database/PgPromiseConnectionAdapter";


const connection = new PgPromiseConnectionAdapter('postgres://dbuser:dbpass@localhost:5432/app');

afterAll(async () => {
   await connection.disconnect();
});

test('should establish connection with db', async () => {
    const items: any[] = await connection.query("select * from ccca.item", []);
    expect(items.length).toBe(3);
});
