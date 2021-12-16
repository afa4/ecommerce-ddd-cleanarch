import Coupon from './Coupon';
import Cpf from './Cpf';
import Item from './Item';
import OrderItem from './OrderItem';

export default class Order {
  cpf: Cpf;
  orderItems: OrderItem[];
  coupon: Coupon | undefined;

  constructor(rawCpf: string) {
    this.cpf = new Cpf(rawCpf);
    this.orderItems = [];
  }

  addItem(item: Item, quantity: number) {
    this.orderItems.push(new OrderItem(item.id, item.price, quantity, item.volume.m3, item.volume.density));
  }

  addCoupon(coupon: Coupon) {
    this.coupon = coupon;
  }

  getTotal(): number {
    const total = this.orderItems.reduce((total, orderItem) => total + orderItem.getTotal(), 0);
    return total * (this.coupon?.getDiscountMultiplicationFactor() ?? 1);
  }

  getShippingTotal(distance: number): number {
    let shippingTotal = 0;
    for(const orderItem of this.orderItems) {
      shippingTotal += orderItem.getShippingTotal(distance);
    }
    return shippingTotal;
  }
}
