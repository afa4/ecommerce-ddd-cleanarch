import UseCase from "../UseCase";
import PlaceWarehouseEventInput from "./PlaceWarehouseEventInput";
import WarehouseEventRepository from "../../../domain/repository/WarehouseEventRepository";
import ItemRepository from "../../../domain/repository/ItemRepository";
import WarehouseEvent from "../../../domain/entity/warehouse/WarehouseEvent";
import {WarehouseEventType, warehouseEventTypeFromString} from "../../../domain/entity/warehouse/WarehouseEventType";
import WarehouseCalculator from '../../../domain/services/warehouse/DefaultWarehouseCalculator';
import DefaultWarehouseCalculator from '../../../domain/services/warehouse/DefaultWarehouseCalculator';

export default class PlaceWarehouseEvent implements UseCase<PlaceWarehouseEventInput, void> {

    constructor(private readonly itemRepository: ItemRepository,
                private readonly warehouseEventRepository: WarehouseEventRepository,
                private readonly warehouseCalculator: WarehouseCalculator = new DefaultWarehouseCalculator()) {
    }

    async execute(input: PlaceWarehouseEventInput): Promise<void> {
        const eventType = warehouseEventTypeFromString(input.eventType);
        const item = await this.itemRepository.findById(input.itemId);
        const events = await this.warehouseEventRepository.findByItemId(item.id);
        const itemQuantityOnStock = this.warehouseCalculator.calculateQuantity(events);
        if(eventType === WarehouseEventType.ITEM_OUT && input.quantity > itemQuantityOnStock) {
            throw new Error('Out of stock')
        }
        const warehouseEvent = new WarehouseEvent(item.id, input.quantity, eventType);
        await this.warehouseEventRepository.save(warehouseEvent)
    }

}
