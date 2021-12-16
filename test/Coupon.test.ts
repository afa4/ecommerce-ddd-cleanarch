import Coupon from '../src/Coupon';

test('should create item', () => {
  expect(new Coupon("VALE50", 50)).toBeTruthy();
});

test('should return discount factor', () => {
  const coupon = new Coupon("VALE50", 20);
  expect(coupon.getDiscountMultiplicationFactor()).toBe(0.8);
});

test('should return discount multiplication factor as 1 if coupon is expired', () => {
  const coupon = new Coupon("VALE50", 20, new Date('2021-01-01'));
  expect(coupon.getDiscountMultiplicationFactor()).toBe(1);
});

test('should return discount multiplicaiton factor if expiration date is in the future', () => {
  const now = new Date();
  const futureYear = now.getFullYear() + 1;
  const futureDate = new Date(`${futureYear}-01-01`);
  const coupon = new Coupon("VALE50", 20, futureDate);
  expect(coupon.getDiscountMultiplicationFactor()).toBe(0.8);
});