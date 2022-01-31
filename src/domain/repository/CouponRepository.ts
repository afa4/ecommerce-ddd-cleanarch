import Coupon from '../entity/coupon/Coupon';

export default interface CouponRepository {
  findById(id: string): Promise<Coupon | undefined>;
}
