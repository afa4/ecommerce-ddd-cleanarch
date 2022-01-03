import OrderMemoryRepository from "../../src/infra/repository/memory/OrderMemoryRepository";
import FindOrders from "../../src/application/use-cases/find-order/FindOrders";

let findOrders: FindOrders;

beforeEach(() => {
    findOrders = new FindOrders(new OrderMemoryRepository());
});

test('should return order list', async () => {
    const output = await findOrders.execute();
    expect(output.orders.length).toBe(1);
});
