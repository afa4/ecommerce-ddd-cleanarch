import Order from '../entity/order/Order';

export default interface OrderRepository {
  save(order: Order): Promise<void>;
  findByCode(code: string): Promise<Order | undefined>;
  findAll(): Promise<Order[]>;
  getSequence(): Promise<number>;
}
