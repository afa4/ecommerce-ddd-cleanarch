import ProcessWarehouseEvent from "../../src/application/use-cases/process-warehouse-event/ProcessWarehouseEvent";
import WarehouseEventMemoryRepository from "../../src/infra/repository/memory/WarehouseEventMemoryRepository";

let processWarehouseEvent: ProcessWarehouseEvent;

beforeEach(() => {
    processWarehouseEvent = new ProcessWarehouseEvent(new WarehouseEventMemoryRepository());
});

test('should process warehouse event', async () => {
    const input = {
        itemId: 'item_id',
        quantity: 10,
        eventType: 'ITEM_IN'
    }
    await processWarehouseEvent.execute(input);
});
