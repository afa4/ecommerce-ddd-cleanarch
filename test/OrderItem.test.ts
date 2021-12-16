import OrderItem from '../src/OrderItem';

test('should create order item', () => {
  const orderItem = new OrderItem("1", 50, 2, 0.003, 333);
  expect(orderItem.getTotal()).toBe(100);
});

test('should caculate minumum size item shipping total', () => {
  const orderItem = new OrderItem("1", 50, 1, 0.003, 333);
  expect(orderItem.getShippingTotal(1000)).toBe(10);
});

test('should caculate medium size item shipping total', () => {
  const orderItem = new OrderItem("1", 50, 1, 0.03, 100);
  expect(orderItem.getShippingTotal(1000)).toBeCloseTo(30);
});

test('should caculate two medium size items shipping total', () => {
  const orderItem = new OrderItem("1", 50, 2, 0.03, 100);
  expect(orderItem.getShippingTotal(1000)).toBeCloseTo(60);
});

test('should caculate big size item shipping total', () => {
  const orderItem = new OrderItem("1", 50, 1, 40, 1);
  expect(orderItem.getShippingTotal(1000)).toBe(400);
});