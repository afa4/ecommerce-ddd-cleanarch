import Coupon from './Coupon';
import Cpf from './Cpf';
import Item from './Item';
import OrderItem from './OrderItem';

export default class Order {
  cpf: Cpf;
  orderItems: OrderItem[];
  coupon: Coupon | undefined;

  constructor(rawCpf: string, readonly createdAt: Date = new Date()) {
    this.cpf = new Cpf(rawCpf);
    this.orderItems = [];
  }

  addItem(item: Item, quantity: number) {
    this.orderItems.push(new OrderItem(item.id, item.price, quantity, item.volume.getVolume(), item.volume.getDensity()));
  }

  addCoupon(coupon: Coupon) {
    if(!coupon.isExpired(this.createdAt)) {
      this.coupon = coupon;
    }
  }

  getTotal(): number {
    const total = this.orderItems.reduce((total, orderItem) => total + orderItem.getTotal(), 0);
    return total - (this.coupon?.getDiscount(total, this.createdAt) ?? 0);
  }

  getShippingTotal(distance: number): number {
    let shippingTotal = 0;
    for(const orderItem of this.orderItems) {
      shippingTotal += orderItem.getShippingTotal(distance);
    }
    return shippingTotal;
  }
}
