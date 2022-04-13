import WarehouseEvent from "../../entity/warehouse/WarehouseEvent";
import {WarehouseEventType} from "../../entity/warehouse/WarehouseEventType";
import WarehouseCalculator from "./WarehouseCalculator";

export default class DefaultWarehouseCalculator implements WarehouseCalculator {

    calculateQuantity(events: WarehouseEvent[]): Number {
        let quantity = 0;
        for(let event of events) {
            switch (event.eventType) {
                case WarehouseEventType.ITEM_IN:
                    quantity += event.quantity;
                    break;
                case WarehouseEventType.ITEM_OUT:
                    quantity -= event.quantity;
                    break;
                default:
                    break;
            }
        }
        return quantity;
    }
}
