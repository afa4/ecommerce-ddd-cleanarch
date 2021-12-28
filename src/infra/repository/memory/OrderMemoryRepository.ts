import Order from '../../../domain/entity/Order';
import OrderRepository from '../../../domain/repository/OrderRepository';

export default class OrderMemoryRepository implements OrderRepository {
  private orders: Order[] = [];
  
  save(order: Order): Promise<void>
  {
    this.orders.push(order);
    return Promise.resolve();
  }

}
