import Item from '../../domain/Item';
import Order from '../../domain/Order';
import ItemRepository from '../../domain/repository/ItemRepository';
import OrderRepository from '../../domain/repository/OrderRepository';
import CouponRepository from '../../domain/repository/CouponRepository';
import PlaceOrderInput from './PlaceOrderInput';
import PlaceOrderOutput from './PlaceOrderOutput';

export default class PlaceOrder {

  constructor(
    private readonly itemRepository: ItemRepository,
    private readonly orderRepository: OrderRepository,
    private readonly couponRepository: CouponRepository
  ) {}
  
  async execute(input: PlaceOrderInput): Promise<PlaceOrderOutput> {
    const order = new Order(input.cpf, input.date);
    const itemIds = input.orderItems.map((orderItem) => orderItem.itemId);
    const itemsMappedById = await this.getItemsMappedById(itemIds); // single call to db
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

  private async getItemsMappedById(itemIds: number[]): Promise<{ [id: number]: Item }> {
    const items = await this.itemRepository.findByIdIn(itemIds);
    if(items.length < itemIds.length) {
       throw new Error('Item(s) not found');
    }
    const itemsMappedById: {[id: number]: Item} = {};
    items.forEach((item) => {
      const itemId = parseInt(item.id);
      itemsMappedById[itemId] = item;
    });
    
    return itemsMappedById;
  }
}
