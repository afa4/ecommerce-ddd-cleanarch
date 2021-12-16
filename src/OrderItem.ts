const MINIMUM_SHIPPING_TOTAL = 10;

export default class OrderItem {
  constructor(
    public readonly itemId: string,
    public readonly price: number,
    public readonly quantity: number,
    public readonly volume: number,
    public readonly density: number,
  ) {}

  getTotal() {
    return this.price * this.quantity;
  }

  getShippingTotal(distance: number) {
    const shippingTotal = distance * this.volume * (this.density / 100) * this.quantity;
    return (shippingTotal < MINIMUM_SHIPPING_TOTAL) ? MINIMUM_SHIPPING_TOTAL: shippingTotal;
  }
}