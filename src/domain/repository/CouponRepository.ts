import Coupon from '../Coupon';

export default interface CouponRepository {
  findById(id: string): Promise<Coupon | undefined>;
}
