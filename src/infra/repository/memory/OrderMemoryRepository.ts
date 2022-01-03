import Order from '../../../domain/entity/Order';
import OrderRepository from '../../../domain/repository/OrderRepository';

const FIRST_ORDER = new Order('935.411.347-80', new Date('2021-01-01'));
FIRST_ORDER.addSequence(1);

export default class OrderMemoryRepository implements OrderRepository {
  private orders: Order[] = [
    FIRST_ORDER
  ];

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
}
