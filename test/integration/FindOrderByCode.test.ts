import FindOrderByCode from "../../src/application/use-cases/find-order-by-code/FindOrderByCode";
import OrderMemoryRepository from "../../src/infra/repository/memory/OrderMemoryRepository";

let findOrderByCode: FindOrderByCode;

beforeEach(() => {
    findOrderByCode = new FindOrderByCode(new OrderMemoryRepository());
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
