import OrderMemoryRepository from "../../src/infra/repository/memory/OrderMemoryRepository";
import FindOrders from "../../src/application/use-cases/find-order/FindOrders";
import OrderRepository from "../../src/domain/repository/OrderRepository";
import Order from "../../src/domain/entity/order/Order";

let findOrders: FindOrders;
let orderRepository: OrderRepository;

beforeEach(async () => {
    orderRepository = new OrderMemoryRepository();
    findOrders = new FindOrders(orderRepository);

    const order = new Order('935.411.347-80', new Date('2021-01-01'));
    order.setSequence(await orderRepository.getSequence());
    await orderRepository.save(order);
});

test('should return order list', async () => {
    const output = await findOrders.execute();
    expect(output.orders.length).toBe(1);
});
