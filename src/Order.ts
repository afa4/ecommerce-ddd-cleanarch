import Coupon from './Coupon';
import Cpf from './Cpf';
import Item from './Item';
import OrderItem from './OrderItem';

export default class Order {
  cpf: Cpf;
  items: OrderItem[];
  coupon: Coupon | undefined;

  constructor(rawCpf: string) {
    this.cpf = new Cpf(rawCpf);
    this.items = [];
  }

  addItem(item: Item, quantity: number) {
    this.items.push(new OrderItem(item.id, item.price, quantity));
  }

  addCoupon(coupon: Coupon) {
    this.coupon = coupon;
  }

  getTotal(): number {
    const total = this.items.reduce((total, orderItem) => total + orderItem.getTotal(), 0);
    return total * (this.coupon?.getDiscountMultiplicationFactor() ?? 1);
  }
}
