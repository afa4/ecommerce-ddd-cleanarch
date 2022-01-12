import WarehouseEvent from "../entity/WarehouseEvent";

export default interface WarehouseEventRepository {
    save(warehouseEvent: WarehouseEvent): Promise<void>;
    findByItemId(itemId: number): Promise<WarehouseEvent[]>;
}
