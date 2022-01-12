import Item from "../../src/domain/entity/Item";
import ItemVolume from "../../src/domain/entity/ItemVolume";
import WarehouseEvent from "../../src/domain/entity/WarehouseEvent";
import {WarehouseEventType} from "../../src/domain/entity/WarehouseEventType";

test('should create a stock unit', () => {
    const item = new Item(1, 'Freezer', 1000, new ItemVolume(200, 100, 50, 40));
    const warehouseEvent = new WarehouseEvent(item, 3, WarehouseEventType.ITEM_IN, new Date('2022-01-11'));
    expect(warehouseEvent.itemId).toBe(1);
    expect(warehouseEvent.quantity).toBe(3);
    expect(warehouseEvent.eventType.toString()).toBe('ITEM_IN');
    expect(warehouseEvent.createdAt).toEqual(new Date('2022-01-11'));
});
