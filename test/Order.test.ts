import Coupon from '../src/Coupon';
import Item from '../src/Item';
import Order from '../src/Order';

test("should create new Order with valid cpf", () => {
  let order = new Order('935.411.347-80');
  expect(order.getTotal()).toBe(0);
});

test("should throw Error when Order cpf is not valid", () => {
  expect(() => new Order('111.111.111-11')).toThrow(new Error('Invalid cpf'));
});

test("should add tree items", () => {
  let order = new Order('935.411.347-80');
  order.addItem(new Item("1", "Book", 50), 1);
  order.addItem(new Item("2", "Pencil", 2), 3);
  order.addItem(new Item("3", "Table", 1000), 1);
  expect(order.getTotal()).toBe(1056);
});


test("should add discount cupon", () => {
  let order = new Order('935.411.347-80');
  order.addItem(new Item("1", "Book", 50), 2);
  order.addCoupon(new Coupon("VALE20", 20));
  expect(order.getTotal()).toBe(80);
});