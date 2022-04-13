import WarehouseEvent from '../../entity/warehouse/WarehouseEvent';

export default interface WarehouseCalculator {
  calculateQuantity(events: WarehouseEvent[]): Number;
}