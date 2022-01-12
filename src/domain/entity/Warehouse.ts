import WarehouseEvent from "./WarehouseEvent";
import {WarehouseEventType} from "./WarehouseEventType";
import Item from "./Item";

export default class Warehouse {
    private quantity: number;
    private readonly itemId: number;

    constructor(item: Item) {
        this.itemId = item.id;
        this.quantity = 0;
    }

    addEvent(event: WarehouseEvent) {
        if(event.itemId !== this.itemId) throw new Error("Incorrect item id event");
        switch (event.eventType) {
            case WarehouseEventType.ITEM_IN:
                this.quantity += event.quantity;
                break;
            case WarehouseEventType.ITEM_OUT:
                this.quantity -= event.quantity;
                break;
            default:
                break;
        }
    }

    getQuantity() {
        return this.quantity;
    }
}
