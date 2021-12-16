export default class Coupon {
  constructor(
    public readonly id: string,
    private readonly discountPercentage: number,
    private readonly expiration: Date | undefined = undefined
  ) {}

  getDiscountMultiplicationFactor() {
    if(this.isExpired()) {
      return 1;
    }
    return 1 - this.discountPercentage / 100;
  }

  private isExpired() {
    return this.expiration && this.expiration.getTime() < new Date().getTime();
  }
}
