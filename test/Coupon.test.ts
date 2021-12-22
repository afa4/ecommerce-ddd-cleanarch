import Coupon from '../src/Coupon';

test('should create item', () => {
  expect(new Coupon("VALE50", 50)).toBeTruthy();
});

test('should return discount', () => {
  const coupon = new Coupon("VALE50", 20);
  expect(coupon.getDiscount(100)).toBe(20);
});

test('should return discount multiplication factor as 1 if coupon is expired', () => {
  const coupon = new Coupon("VALE50", 20, new Date('2020-01-01'));
  const referenceDate = new Date('2021-01-01');
  expect(coupon.getDiscount(100, referenceDate)).toBe(0);
});

test('should return discount multiplicaiton factor if expiration date is in the future', () => {
  const coupon = new Coupon("VALE50", 20, new Date('2022-01-01'));
  const referenceDate = new Date('2021-01-01');
  expect(coupon.getDiscount(100, referenceDate)).toBe(20);
});