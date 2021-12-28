import Coupon from '../../src/domain/entity/Coupon';
import Item from '../../src/domain/entity/Item';
import ItemVolume from '../../src/domain/entity/ItemVolume';
import Order from '../../src/domain/entity/Order';
import NoFreightCalculator from '../../src/domain/entity/NoFreightCalculator';

let order: Order;
const DUMMY_ITEM_VOLUME = new ItemVolume();
const NO_FREIGHT_CALCULATOR = new NoFreightCalculator();

beforeEach(() => {
  order = new Order('935.411.347-80');
})

test("should create new Order with valid cpf", () => {
  expect(order.getTotal()).toBe(0);
});

test("should throw Error when Order cpf is not valid", () => {
  expect(() => new Order('111.111.111-11')).toThrow(new Error('Invalid cpf'));
});

test("should add tree items (no freight)", () => {
  const order = new Order('935.411.347-80', new Date(), NO_FREIGHT_CALCULATOR);
  order.addItem(new Item("1", "Book", 50, DUMMY_ITEM_VOLUME), 1);
  order.addItem(new Item("2", "Pencil", 2, DUMMY_ITEM_VOLUME), 3);
  order.addItem(new Item("3", "Table", 1000, DUMMY_ITEM_VOLUME), 1);
  expect(order.getTotal()).toBe(1056);
});

test("should not apply expired discount cupon (no freight)", () => {
  const order = new Order('935.411.347-80', new Date(), NO_FREIGHT_CALCULATOR);
  order.addItem(new Item('1', 'Book', 50, DUMMY_ITEM_VOLUME), 2);
  order.addCoupon(new Coupon('VALE20', 20, new Date('2019-01-01')));
  expect(order.getTotal()).toBe(100);
});

test("should add discount cupon (no freight)", () => {
  const order = new Order('935.411.347-80', new Date(), NO_FREIGHT_CALCULATOR);
  order.addItem(new Item("1", "Book", 50, DUMMY_ITEM_VOLUME), 2);
  order.addCoupon(new Coupon("VALE20", 20));
  expect(order.getTotal()).toBe(80);
});

test("should add discount cupon (default freight)", () => {
  const order = new Order('935.411.347-80', new Date());
  order.addItem(new Item("1", "Book", 50, DUMMY_ITEM_VOLUME), 2);
  order.addCoupon(new Coupon("VALE20", 20));
  expect(order.getTotal()).toBe(90);
});

test('should calculate minimum freight (default)', () => {
  const volume = new ItemVolume(20, 15, 10, 1);
  const book = new Item('1', 'Book', 50, volume);
  order.addItem(book, 1);
  expect(order.getFreight()).toBe(10);
});

test('should calculate Freezer freight (default)', () => {
  const volume = new ItemVolume(200, 100, 50, 40);
  const freezer =  new Item('1', 'Freezer', 50, volume);
  order.addItem(freezer, 1);
  expect(order.getFreight()).toBe(400);
});

test('should calculate Guittar freight (default)', () => {
  const volume = new ItemVolume(100, 30, 10, 3);
  const guittar =  new Item('1', 'Guittar', 50, volume);
  order.addItem(guittar, 1);
  expect(order.getFreight()).toBe(30);
});

test('should calculate two Guittar freight (default)', () => {
  const volume = new ItemVolume(100, 30, 10, 3);
  const guittar =  new Item('1', 'Guittar', 50, volume);
  order.addItem(guittar, 2);
  expect(order.getFreight()).toBe(60);
});

test('should calculate Book, Freezer and Guittar freight (default)', () => {
  const volume = new ItemVolume(20, 15, 10, 1);
  const book = new Item('1', 'Book', 50, volume);

  const guittarVolume = new ItemVolume(100, 30, 10, 3);
  const guittar =  new Item('1', 'Guittar', 50, guittarVolume);

  const freezerVolume = new ItemVolume(200, 100, 50, 40);
  const freezer =  new Item('1', 'Freezer', 50, freezerVolume);

  [book, guittar, freezer].forEach((item) => order.addItem(item, 1));

  expect(order.getFreight()).toBe(440);
});

test('getCode should throw error when order has not sequence', () => {
  const order = new Order('935.411.347-80', new Date('2019-01-01'));

  expect(() => order.getCode()).toThrow(new Error('Order has not sequence'));
});

test('getCode should return order code', () => {
  const order = new Order('935.411.347-80', new Date('2019-01-01'));

  order.addSequence(1);

  expect(order.getCode()).toBe('201900000001');
});
