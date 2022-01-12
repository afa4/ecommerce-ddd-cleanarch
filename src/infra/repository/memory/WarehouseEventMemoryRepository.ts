import WarehouseEventRepository from "../../../domain/repository/WarehouseEventRepository";
import WarehouseEvent from "../../../domain/entity/WarehouseEvent";
import Item from "../../../domain/entity/Item";
import ItemVolume from "../../../domain/entity/ItemVolume";
import {WarehouseEventType} from "../../../domain/entity/WarehouseEventType";

export default class WarehouseEventMemoryRepository implements WarehouseEventRepository {
    private readonly ITEM = new Item(1, 'Freezer', 1000, new ItemVolume(200, 100, 50, 40));

    private readonly warehouseEvents: { [itemId: string]: WarehouseEvent[] } = {
        1: [
            new WarehouseEvent(this.ITEM, 5, WarehouseEventType.ITEM_IN),
            new WarehouseEvent(this.ITEM, 2, WarehouseEventType.ITEM_OUT),
            new WarehouseEvent(this.ITEM, 5, WarehouseEventType.ITEM_IN),
            new WarehouseEvent(this.ITEM, 1, WarehouseEventType.ITEM_OUT)
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
