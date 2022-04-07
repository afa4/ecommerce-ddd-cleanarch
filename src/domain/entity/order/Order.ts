import Coupon from "../coupon/Coupon";
import Cpf from "./Cpf";
import Item from "../item/Item";
import OrderItem from "./OrderItem";
import FreightCalculator from '../../services/freight/FreightCalculator';
import DefaultFreightCalculator from '../../services/freight/DefaultFreightCalculator';


import OrderCode from "./OrderCode";

export default class Order {
  private sequence: number | undefined;
  private orderCode: OrderCode | undefined;
  private cpf: Cpf;
  private readonly orderItems: OrderItem[];
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

  setSequence(sequence: number) {
    this.sequence = sequence;
    this.orderCode = new OrderCode(this.sequence, this.createdAt);
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
    if(!this.orderCode) throw new Error('Order doesnt have code');
    return this.orderCode.value;
  }

  getCoupon(): string | undefined {
    return this.coupon?.id;
  }

  getCpf(): string {
    return this.cpf.value;
  }

  getItems(): OrderItem[] {
    return this.orderItems;
  }
}
