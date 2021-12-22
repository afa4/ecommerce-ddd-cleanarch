export default class Coupon {
  constructor(
    public readonly id: string,
    private readonly discountPercentage: number,
    private readonly expiration: Date | undefined = undefined
  ) {}

  getDiscount(value: number, referenceDate: Date = new Date()): number {
    if(this.isExpired(referenceDate)) {
      return 0;
    }

    return value * this.discountPercentage / 100
  }

  isExpired(referenceDate: Date = new Date()): boolean {
    if(!this.expiration) {
      return false;
    }
    return this.expiration.getTime() < referenceDate.getTime(); // TODO: inverter a dependencia da data
  }
}
