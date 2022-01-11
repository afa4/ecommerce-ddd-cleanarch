import WarehouseEventRepository from "../../../domain/repository/WarehouseEventRepository";
import WarehouseEvent from "../../../domain/entity/WarehouseEvent";

export default class WarehouseEventMemoryRepository implements WarehouseEventRepository {
    findByItemId(itemId: string): Promise<WarehouseEvent[]> {
        return Promise.resolve([]);
    }

    save(warehouseEvent: WarehouseEvent): Promise<void> {
        return Promise.resolve(undefined);
    }
}
