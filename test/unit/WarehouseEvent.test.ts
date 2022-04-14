import WarehouseEvent from "../../src/domain/entity/warehouse/WarehouseEvent";
import {WarehouseEventType} from "../../src/domain/entity/warehouse/WarehouseEventType";

test('should create a stock unit', () => {
    const warehouseEvent = new WarehouseEvent(1, 3, WarehouseEventType.ITEM_IN, new Date('2022-01-11'));
    expect(warehouseEvent.itemId).toBe(1);
    expect(warehouseEvent.quantity).toBe(3);
    expect(warehouseEvent.eventType.toString()).toBe('ITEM_IN');
    expect(warehouseEvent.createdAt).toEqual(new Date('2022-01-11'));
});
