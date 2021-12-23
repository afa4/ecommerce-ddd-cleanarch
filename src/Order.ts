import Coupon from "./Coupon";
import Cpf from "./Cpf";
import Item from "./Item";
import OrderItem from "./OrderItem";
import FreightCalculator from "./FreightCalculator";
import DefaultFreightCalculator from "./DefaultFreightCalculator";

export default class Order {
  private cpf: Cpf;
  private orderItems: OrderItem[];
  private coupon: Coupon | undefined;
  private freight: number;

  constructor(
    rawCpf: string,
    readonly createdAt: Date = new Date(),
    readonly freightCalculator: FreightCalculator = new DefaultFreightCalculator()
  ) {
    this.cpf = new Cpf(rawCpf);
    this.orderItems = [];
    this.freight = 0;
  }

  addItem(item: Item, quantity: number) {
    this.freight += this.freightCalculator.calculate(item, quantity, 1000);
    this.orderItems.push(new OrderItem(item.id, item.price, quantity));
  }

  addCoupon(coupon: Coupon) {
    if (coupon.isExpired(this.createdAt)) return;
    this.coupon = coupon;
  }

  getTotal(): number {
    const total = this.orderItems.reduce(
      (total, orderItem) => total + orderItem.getTotal(),
      0
    );
    return total - (this.coupon?.getDiscount(total, this.createdAt) ?? 0);
  }

  getFreight(): number {
    return this.freight;
  }
}
