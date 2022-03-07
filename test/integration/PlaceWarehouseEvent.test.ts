import PlaceWarehouseEvent from "../../src/application/use-cases/place-warehouse-event/PlaceWarehouseEvent";
import WarehouseEventMemoryRepository from "../../src/infra/repository/memory/WarehouseEventMemoryRepository";
import ItemMemoryRepository from "../../src/infra/repository/memory/ItemMemoryRepository";

let placeWarehouseEvent: PlaceWarehouseEvent;

beforeEach(() => {
    placeWarehouseEvent = new PlaceWarehouseEvent(new ItemMemoryRepository(), new WarehouseEventMemoryRepository());
});

test('should place warehouse event', async () => {
    const input = {
        itemId: 1,
        quantity: 10,
        eventType: 'ITEM_IN'
    }
    await placeWarehouseEvent.execute(input);
});

test('should throw error in ITEM_OUT event where warehouse is empty', async () => {
    const input = {
        itemId: 2,
        quantity: 10,
        eventType: 'ITEM_OUT'
    }
    await expect(placeWarehouseEvent.execute(input)).rejects.toThrow('Out of stock');
});
