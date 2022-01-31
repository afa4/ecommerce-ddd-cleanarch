import Warehouse from "../../src/domain/entity/warehouse/Warehouse";
import Item from "../../src/domain/entity/item/Item";
import ItemVolume from "../../src/domain/entity/item/ItemVolume";
import WarehouseEvent from "../../src/domain/entity/warehouse/WarehouseEvent";
import {WarehouseEventType} from "../../src/domain/entity/warehouse/WarehouseEventType";

const ITEM = new Item(1, 'Freezer', 1000, new ItemVolume(200, 100, 50, 40));

test('should create item stock', () => {
    const warehouse = new Warehouse(ITEM);
    expect(warehouse.getQuantity()).toBe(0);
});

test('should increment item stock when adds event', () => {
    const warehouse = new Warehouse(ITEM);
    const warehouseEvent = new WarehouseEvent(ITEM, 3, WarehouseEventType.ITEM_IN);
    warehouse.addEvent(warehouseEvent);
    expect(warehouse.getQuantity()).toBe(3);
});

test('should decrement item stock when adds event', () => {
    const warehouse = new Warehouse(ITEM);
    const events = [
        new WarehouseEvent(ITEM, 3, WarehouseEventType.ITEM_IN),
        new WarehouseEvent(ITEM, 1, WarehouseEventType.ITEM_OUT),
    ];
    events.forEach((event) => warehouse.addEvent(event));

    expect(warehouse.getQuantity()).toBe(2);
})
