import Coupon from "./Coupon";
import Cpf from "./Cpf";
import Item from "./Item";
import OrderItem from "./OrderItem";
import FreightCalculator from "./FreightCalculator";
import DefaultFreightCalculator from "./DefaultFreightCalculator";

export default class Order {
  private sequence: number | undefined;
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

  addSequence(sequence: number) {
    this.sequence = sequence;
  }

  getTotal(): number {
    const total = this.orderItems.reduce((total, orderItem) => total + orderItem.getTotal(), 0);
    const discount = this.coupon?.getDiscount(total, this.createdAt) ?? 0;
    return total + this.freight - discount;
  }

  getFreight(): number {
    return this.freight;
  }

  getCode(): string {
    if(!this.sequence) throw new Error('Order has not sequence');

    let sequenceString = '' + this.sequence;

    while(sequenceString.length < 8) {
      sequenceString = '0' + sequenceString;
    }
    
    return this.createdAt.getUTCFullYear() + sequenceString;
  }
}
