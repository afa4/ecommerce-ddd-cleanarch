import WarehouseEventRepository from "../../../domain/repository/WarehouseEventRepository";
import WarehouseEvent from "../../../domain/entity/warehouse/WarehouseEvent";
import Item from "../../../domain/entity/item/Item";
import ItemVolume from "../../../domain/entity/item/ItemVolume";
import {WarehouseEventType} from "../../../domain/entity/warehouse/WarehouseEventType";

export default class WarehouseEventMemoryRepository implements WarehouseEventRepository {
    private readonly ITEM = new Item(1, 'Freezer', 1000, new ItemVolume(200, 100, 50, 40));

    private readonly warehouseEvents: { [itemId: string]: WarehouseEvent[] } = {
        1: [
            new WarehouseEvent(1, 5, WarehouseEventType.ITEM_IN),
            new WarehouseEvent(1, 2, WarehouseEventType.ITEM_OUT),
            new WarehouseEvent(1, 5, WarehouseEventType.ITEM_IN),
            new WarehouseEvent(1, 1, WarehouseEventType.ITEM_OUT)
        ]
    }

    findByItemId(itemId: number): Promise<WarehouseEvent[]> {
        const events = this.warehouseEvents[itemId];
        return Promise.resolve(events ?? []);
    }

    save(event: WarehouseEvent): Promise<void> {
        if(!this.warehouseEvents[event.itemId]) {
            this.warehouseEvents[event.itemId] = [];
        } else {
            this.warehouseEvents[event.itemId].push(event);
        }
        return Promise.resolve();
    }
}
