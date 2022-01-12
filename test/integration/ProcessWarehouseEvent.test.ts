import ProcessWarehouseEvent from "../../src/application/use-cases/process-warehouse-event/ProcessWarehouseEvent";
import WarehouseEventMemoryRepository from "../../src/infra/repository/memory/WarehouseEventMemoryRepository";
import ItemMemoryRepository from "../../src/infra/repository/memory/ItemMemoryRepository";

let processWarehouseEvent: ProcessWarehouseEvent;

beforeEach(() => {
    processWarehouseEvent = new ProcessWarehouseEvent(new ItemMemoryRepository(), new WarehouseEventMemoryRepository());
});

test('should process warehouse event', async () => {
    const input = {
        itemId: 1,
        quantity: 10,
        eventType: 'ITEM_IN'
    }
    await processWarehouseEvent.execute(input);
});

test('should throw error in ITEM_OUT event where warehouse is empty', async () => {
    const input = {
        itemId: 2,
        quantity: 10,
        eventType: 'ITEM_OUT'
    }
    await expect(processWarehouseEvent.execute(input)).rejects.toThrow('Out of stock');
});
