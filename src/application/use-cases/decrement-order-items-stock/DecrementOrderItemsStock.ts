import UseCase from "../UseCase";
import WarehouseEventRepository from "../../../domain/repository/WarehouseEventRepository";
import ItemRepository from "../../../domain/repository/ItemRepository";
import WarehouseCalculator from "../../../domain/services/warehouse/DefaultWarehouseCalculator";
import DefaultWarehouseCalculator from "../../../domain/services/warehouse/DefaultWarehouseCalculator";
import OrderPlacedEvent from "../../use-cases/place-order/OrderPlacedEvent";
import WarehouseEvent from '../../../domain/entity/warehouse/WarehouseEvent';
import { WarehouseEventType } from '../../../domain/entity/warehouse/WarehouseEventType';

export default class DecrementOrderItemsStock
  implements UseCase<OrderPlacedEvent, void>
{
  constructor(
    private readonly itemRepository: ItemRepository,
    private readonly warehouseEventRepository: WarehouseEventRepository,
    private readonly warehouseCalculator: WarehouseCalculator = new DefaultWarehouseCalculator()
  ) {}

  async execute(input: OrderPlacedEvent): Promise<void> {
    const order = input.order;
    for (let orderItem of order.getItems()) {
      new WarehouseEvent(orderItem.itemId, orderItem.quantity, WarehouseEventType.ITEM_OUT)
      orderItem.itemId
    }
    return Promise.resolve();
  }
}
