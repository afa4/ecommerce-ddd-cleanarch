import WarehouseEvent from '../../../domain/entity/warehouse/WarehouseEvent';
import WarehouseEventRepository from '../../../domain/repository/WarehouseEventRepository';
import Connection from '../../database/Connection'

export default class WarehouseEventDatabaseRepository implements WarehouseEventRepository {
  constructor(private readonly connection: Connection) {}
  save(warehouseEvent: WarehouseEvent): Promise<void>
  {
    throw new Error('Method not implemented.');
  }
  async findByItemId(itemId: number): Promise<WarehouseEvent[]>
  {
    const warehouseEventsData = await this.connection.query("select * from warehouse_event where id_item = $1", [itemId]);
    // TODO: map to object
    return Promise.resolve([]);
  }
}