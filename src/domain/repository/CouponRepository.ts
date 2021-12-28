import Coupon from '../entity/Coupon';

export default interface CouponRepository {
  findById(id: string): Promise<Coupon | undefined>;
}
