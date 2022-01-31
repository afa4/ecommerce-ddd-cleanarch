import UseCase from "../UseCase";
import ProcessWarehouseEventInput from "./ProcessWarehouseEventInput";
import WarehouseEventRepository from "../../../domain/repository/WarehouseEventRepository";
import Warehouse from "../../../domain/entity/warehouse/Warehouse";
import ItemRepository from "../../../domain/repository/ItemRepository";
import WarehouseEvent from "../../../domain/entity/warehouse/WarehouseEvent";
import Item from "../../../domain/entity/item/Item";
import {WarehouseEventType, warehouseEventTypeFromString} from "../../../domain/entity/warehouse/WarehouseEventType";

export default class ProcessWarehouseEvent implements UseCase<ProcessWarehouseEventInput, void> {

    constructor(private readonly itemRepository: ItemRepository,
                private readonly warehouseEventRepository: WarehouseEventRepository) {
    }

    async execute(input: ProcessWarehouseEventInput): Promise<void> {
        const eventType = warehouseEventTypeFromString(input.eventType);
        const item = await this.itemRepository.findById(input.itemId);
        const warehouse = await this.getWarehouse(item);
        if(eventType === WarehouseEventType.ITEM_OUT && input.quantity > warehouse.getQuantity()) {
            throw new Error('Out of stock')
        }
        const warehouseEvent = new WarehouseEvent(item, input.quantity, eventType);
        await this.warehouseEventRepository.save(warehouseEvent)
    }

    private async getWarehouse(item: Item): Promise<Warehouse> {
        const warehouse = new Warehouse(item);
        const events = await this.warehouseEventRepository.findByItemId(item.id);
        events.forEach((event) => warehouse.addEvent(event));
        return warehouse;
    }
}
