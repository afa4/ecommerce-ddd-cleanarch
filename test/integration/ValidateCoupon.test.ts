import ValidateCoupon from '../../src/application/validate-coupon/ValidateCoupon'
import CouponRepository from '../../src/domain/repository/CouponRepository';
import CouponMemoryRepository from '../../src/infra/repository/memory/CouponMemoryRepository';

let validateCoupon: ValidateCoupon;
let couponRepository: CouponRepository;

beforeEach(() => {
  couponRepository = new CouponMemoryRepository();
  validateCoupon = new ValidateCoupon(couponRepository);
});

test('should fetch coupon code in repository', () => {
  const couponRepositorySpy = jest.spyOn(couponRepository, 'findById');
  const couponCode = 'VALE20';
  validateCoupon.execute(couponCode);
  expect(couponRepositorySpy).toBeCalledWith('VALE20');
});

test('should return true when coupon is not expired', async () => {
  const couponCode = 'VALE20';
  const isValid = await validateCoupon.execute(couponCode);
  expect(isValid).toBeTruthy();
});

test('should return false when coupon is expired', async () => {
  const couponCode = 'VALE10';
  const isValid = await validateCoupon.execute(couponCode);
  expect(isValid).toBeFalsy();
});