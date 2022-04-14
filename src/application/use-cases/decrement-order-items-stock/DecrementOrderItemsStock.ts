import UseCase from "../UseCase";
import WarehouseEventRepository from "../../../domain/repository/WarehouseEventRepository";
import WarehouseCalculator from "../../../domain/services/warehouse/DefaultWarehouseCalculator";
import DefaultWarehouseCalculator from "../../../domain/services/warehouse/DefaultWarehouseCalculator";
import OrderPlacedEvent from "../../use-cases/place-order/OrderPlacedEvent";
import WarehouseEvent from "../../../domain/entity/warehouse/WarehouseEvent";
import { WarehouseEventType } from "../../../domain/entity/warehouse/WarehouseEventType";
import OrderItem from "../../../domain/entity/order/OrderItem";

export default class DecrementOrderItemsStock
  implements UseCase<OrderPlacedEvent, void>
{
  constructor(
    private readonly warehouseEventRepository: WarehouseEventRepository,
    private readonly warehouseCalculator: WarehouseCalculator = new DefaultWarehouseCalculator()
  ) {}

  async execute(input: OrderPlacedEvent): Promise<void> {
    const order = input.order;
    try {
      (await this.buildDecrementStockEvents(order.getItems())).forEach(
        (decrementEvent) => this.warehouseEventRepository.save(decrementEvent) // TODO: Refactor -> use a simgle transaction
      );
    } catch (error) {
      // TODO: Cancel Order
    }
    return Promise.resolve();
  }

  private async buildDecrementStockEvents(orderItems: OrderItem[]) {
    const decrementStockEvents: WarehouseEvent[] = [];
    for (let orderItem of orderItems) {
      const events = await this.warehouseEventRepository.findByItemId( // TODO: Refactor -> use a simgle transaction
        orderItem.itemId
      );
      const itemQuantity = this.warehouseCalculator.calculateQuantity(events);
      if (itemQuantity < orderItem.quantity) {
        throw new Error("Item out of stock");
      }
      decrementStockEvents.push(
        new WarehouseEvent(
          orderItem.itemId,
          orderItem.quantity,
          WarehouseEventType.ITEM_OUT
        )
      );
    }
    return decrementStockEvents;
  }
}
