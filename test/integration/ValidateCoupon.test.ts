import ValidateCoupon from '../../src/application/use-cases/validate-coupon/ValidateCoupon'
import CouponRepository from '../../src/domain/repository/CouponRepository';
import CouponDatabaseRepository from "../../src/infra/repository/database/CouponDatabaseRepository";
import Connection from "../../src/infra/database/Connection";
import PgPromiseConnectionAdapter from "../../src/infra/database/PgPromiseConnectionAdapter";

let validateCoupon: ValidateCoupon;
let couponRepository: CouponRepository;
let connection: Connection = new PgPromiseConnectionAdapter('postgres://dbuser:dbpass@localhost:5432/app');

beforeEach(() => {
  couponRepository = new CouponDatabaseRepository(connection);
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
  const couponCode = 'VALE20_EXPIRED';
  const isValid = await validateCoupon.execute(couponCode);
  expect(isValid).toBeFalsy();
});

afterAll(async () => {
  await connection.disconnect();
})
