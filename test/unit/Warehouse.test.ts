import WarehouseCalculator from "../../src/domain/services/warehouse/DefaultWarehouseCalculator";
import Item from "../../src/domain/entity/item/Item";
import ItemVolume from "../../src/domain/entity/item/ItemVolume";
import WarehouseEvent from "../../src/domain/entity/warehouse/WarehouseEvent";
import {WarehouseEventType} from "../../src/domain/entity/warehouse/WarehouseEventType";

const ITEM = new Item(1, 'Freezer', 1000, new ItemVolume(200, 100, 50, 40));
let  warehouseCalculator: WarehouseCalculator;

beforeEach(() => {
    warehouseCalculator = new WarehouseCalculator();
});

test('should create item stock', () => {
    expect(warehouseCalculator.calculateQuantity([])).toBe(0);
});

test('should increment item stock when adds event', () => {
    const quantity = warehouseCalculator.calculateQuantity([
        new WarehouseEvent(ITEM, 3, WarehouseEventType.ITEM_IN)
    ]);
    expect(quantity).toBe(3);
});

test('should decrement item stock when adds event', () => {
    const quantity = warehouseCalculator.calculateQuantity([
        new WarehouseEvent(ITEM, 3, WarehouseEventType.ITEM_IN),
        new WarehouseEvent(ITEM, 1, WarehouseEventType.ITEM_OUT),
    ]);

    expect(quantity).toBe(2);
})
