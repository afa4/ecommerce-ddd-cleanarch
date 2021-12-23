import ItemVolume from '../src/ItemVolume';
import OrderItem from '../src/OrderItem';

test('should create order item', () => {
  const smallVolume = new ItemVolume(20, 15, 10, 1);  
  const orderItem = new OrderItem("1", 50, 2, smallVolume);
  expect(orderItem.getTotal()).toBe(100);
});

test('should caculate minumum size item shipping total', () => {
  const smallVolume = new ItemVolume(20, 15, 10, 1);
  const orderItem = new OrderItem("1", 50, 1, smallVolume);
  expect(orderItem.getShippingTotal(1000)).toBe(10);
});

test('should caculate medium size item shipping total', () => {
  const mediumVolume = new ItemVolume(100, 30, 10, 3);
  const orderItem = new OrderItem("1", 50, 1, mediumVolume);
  expect(orderItem.getShippingTotal(1000)).toBeCloseTo(30);
});

test('should caculate two medium size items shipping total', () => {
  const mediumVolume = new ItemVolume(100, 30, 10, 3);
  const orderItem = new OrderItem("1", 50, 2, mediumVolume);
  expect(orderItem.getShippingTotal(1000)).toBeCloseTo(60);
});

test('should caculate big size item shipping total', () => {
  const bigVolume = new ItemVolume(200, 100, 50, 40);
  const orderItem = new OrderItem("1", 50, 1, bigVolume);
  expect(orderItem.getShippingTotal(1000)).toBe(400);
});