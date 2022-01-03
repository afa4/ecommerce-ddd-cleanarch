import Order from '../../../domain/entity/Order';
import CouponRepository from '../../../domain/repository/CouponRepository';
import ItemRepository from '../../../domain/repository/ItemRepository';
import OrderRepository from '../../../domain/repository/OrderRepository';
import UseCase from '../UseCase';
import PlaceOrderInput from './PlaceOrderInput';
import PlaceOrderOutput from './PlaceOrderOutput';

export default class PlaceOrder implements UseCase<PlaceOrderInput, PlaceOrderOutput> {

  constructor(
    private readonly itemRepository: ItemRepository,
    private readonly orderRepository: OrderRepository,
    private readonly couponRepository: CouponRepository
  ) {}

  async execute(input: PlaceOrderInput): Promise<PlaceOrderOutput> {
    const order = new Order(input.cpf, input.date);
    order.setSequence(await this.orderRepository.getSequence());
    const itemIds = input.orderItems.map((orderItem) => orderItem.itemId);
    const itemsMappedById = await this.itemRepository.getItemsMappedByIdWhereIdIn(itemIds); // single call to db
    input.orderItems.forEach((orderItem) => {
      const item = itemsMappedById[orderItem.itemId];
      order.addItem(item, orderItem.quantity);
    });
    if(input.coupon) {
      const coupon = await this.couponRepository.findById(input.coupon);
      if(coupon) {
        order.addCoupon(coupon);
      }
    }

    await this.orderRepository.save(order);
    const output = new PlaceOrderOutput(order.getTotal());

    return Promise.resolve(output);
  }
}
