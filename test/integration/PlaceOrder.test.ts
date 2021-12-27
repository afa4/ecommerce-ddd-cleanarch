import PlaceOrder from '../../src/application/place-order/PlaceOrder';
import Item from '../../src/domain/Item';
import ItemVolume from '../../src/domain/ItemVolume';
import Order from '../../src/domain/Order';
import CouponRepository from '../../src/domain/repository/CouponRepository';
import ItemRepository from '../../src/domain/repository/ItemRepository';
import OrderRepository from '../../src/domain/repository/OrderRepository';
import ItemMemoryRepository from '../../src/infra/repository/memory/ItemMemoryRepository';
import OrderMemoryRepository from '../../src/infra/repository/memory/OrderMemoryRepository';
import CouponMemoryRepository from '../../src/infra/repository/memory/CouponMemoryRepository';

let placeOrder: PlaceOrder;
let itemRepository: ItemRepository;
let orderRepository: OrderRepository;
let couponRepository: CouponRepository;

beforeEach(() => {
  itemRepository = new ItemMemoryRepository();
  orderRepository = new OrderMemoryRepository();
  couponRepository = new CouponMemoryRepository();
  placeOrder = new PlaceOrder(itemRepository, orderRepository, couponRepository);
});

test('should throw error while placing order with invalid cpf', async () => {
  const placeOrderInput = {
    cpf: '935.411.347-x8',
    orderItems: [
      { itemId: 1, quantity: 1 },
    ],
    date: new Date('2021-12-27')
  };

  await expect(() => placeOrder.execute(placeOrderInput)).rejects.toThrow('Invalid cpf');
});

test('should place order from input with 3 items', async () => {
  const placeOrderInput = {
    cpf: '935.411.347-80',
    orderItems: [
      { itemId: 1, quantity: 1 },
      { itemId: 2, quantity: 2 },
      { itemId: 3, quantity: 1 }
    ],
    date: new Date('2021-12-27')
  };

  const placeOrderOutput = await placeOrder.execute(placeOrderInput);

  expect(placeOrderOutput.total).toBe(5520);
});

test('should place order and save it on repository', async () => {
  const orderRepositorySpy = jest.spyOn(orderRepository, "save");
  const createdAt = new Date('2021-12-27');
  const placeOrderInput = {
    cpf: '935.411.347-80',
    orderItems: [
      { itemId: 1, quantity: 1 },
    ],
    date: createdAt
  };

  await placeOrder.execute(placeOrderInput);

  const expectedOrder = new Order('935.411.347-80', createdAt);
  expectedOrder.addItem(new Item('1', 'Freezer', 1000, new ItemVolume(200, 100, 50, 40)), 1);
  expect(orderRepositorySpy).toBeCalledWith(expectedOrder);
});

test('should place order getting items from repository', async () => {
  const itemRepositorySpy = jest.spyOn(itemRepository, 'findByIdIn');
  const createdAt = new Date('2021-12-27');
  const placeOrderInput = {
    cpf: '935.411.347-80',
    orderItems: [
      { itemId: 1, quantity: 1 },
      { itemId: 2, quantity: 2 },
      { itemId: 3, quantity: 1 }
    ],
    date: createdAt
  };

  await placeOrder.execute(placeOrderInput);

  expect(itemRepositorySpy).toBeCalledWith([1,2,3]);
});

test('should throw error while placing order if items cant be found', async () => {
  const placeOrderInput = {
    cpf: '935.411.347-80',
    orderItems: [
      { itemId: 88, quantity: 1 },
      { itemId: 99, quantity: 2 }
    ],
    date: new Date('2021-12-27')
  };

  await expect(() => placeOrder.execute(placeOrderInput)).rejects.toThrow('Item(s) not found');
});

test('should throw error while placing order if only some items could be found', async () => {
  const placeOrderInput = {
    cpf: '935.411.347-80',
    orderItems: [
      { itemId: 1, quantity: 1 },
      { itemId: 99, quantity: 2 }
    ],
    date: new Date('2021-12-27')
  };

  await expect(() => placeOrder.execute(placeOrderInput)).rejects.toThrow('Item(s) not found');
});

test('should place order with coupon', async () => {
  const placeOrderInput = {
    cpf: '935.411.347-80',
    orderItems: [
      { itemId: 1, quantity: 1 },
    ],
    date: new Date('2021-12-27'),
    coupon: "VALE20"
  };

  const output = await placeOrder.execute(placeOrderInput);
  await expect(output.total).toBe(1200); // total (800) + freight (400)
});
