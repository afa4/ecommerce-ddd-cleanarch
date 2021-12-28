import CouponRepository from '../../../domain/repository/CouponRepository';
import UseCase from '../UseCase';

export default class ValidateCoupon implements UseCase<string, boolean> {

  constructor(private readonly couponRepository: CouponRepository) {}

  async execute(couponCode: string): Promise<boolean>
  {
    const coupon = await this.couponRepository.findById(couponCode);
    if(!coupon) return Promise.resolve(false);
    return Promise.resolve(coupon.isValid());
  }
}
