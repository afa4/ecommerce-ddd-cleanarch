import Coupon from '../src/Coupon';

test('should create item', () => {
  expect(new Coupon("VALE50", 50)).toBeTruthy();
});