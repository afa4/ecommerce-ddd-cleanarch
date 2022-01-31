import FindOrderByCode from "../../src/application/use-cases/find-order-by-code/FindOrderByCode";
import OrderMemoryRepository from "../../src/infra/repository/memory/OrderMemoryRepository";
import OrderRepository from "../../src/domain/repository/OrderRepository";
import Order from "../../src/domain/entity/order/Order";

let findOrderByCode: FindOrderByCode;
let orderRepository: OrderRepository;

beforeEach(async () => {
    orderRepository = new OrderMemoryRepository();
    findOrderByCode = new FindOrderByCode(orderRepository);

    const order = new Order('935.411.347-80', new Date('2021-01-01'));
    order.setSequence(await orderRepository.getSequence());
    await orderRepository.save(order);
});

test('should find order by code', async () => {
    const code = '202100000001';
    const result = await findOrderByCode.execute(code);
    expect(result.code).toBe(code);
})

test('should throw error if order is not found', async () => {
    const code = '202900000001';
    await expect(findOrderByCode.execute(code)).rejects.toThrow('Order not found');
})
