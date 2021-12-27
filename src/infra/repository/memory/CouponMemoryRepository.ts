import Coupon from '../../../domain/Coupon';
import CouponRepository from '../../../domain/repository/CouponRepository';

export default class CouponMemoryRepository implements CouponRepository {

  private coupons: Coupon[] = [
    new Coupon("VALE20", 20)
  ]

  findById(id: string): Promise<Coupon | undefined>
  {
    for(const coupon of this.coupons) {
      if(coupon.id === id) return Promise.resolve(coupon);
    }
    return Promise.resolve(undefined);
  }

}