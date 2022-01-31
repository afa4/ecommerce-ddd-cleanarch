import Order from '../../../domain/entity/order/Order';
import OrderRepository from '../../../domain/repository/OrderRepository';

export default class OrderMemoryRepository implements OrderRepository {
  private sequence = 0;
  private orders: Order[] = [];

  findByCode(code: string): Promise<Order | undefined> {
    const result = this.orders.find((order) => {
      return order.getCode() === code;
    });
    return Promise.resolve(result);
  }

  save(order: Order): Promise<void>
  {
    this.orders.push(order);
    return Promise.resolve();
  }

  findAll(): Promise<Order[]> {
    return Promise.resolve(this.orders);
  }

  getSequence(): Promise<number> {
    return Promise.resolve(++this.sequence);
  }
}
