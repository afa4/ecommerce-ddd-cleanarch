import Item from "./Item";
import {WarehouseEventType} from "./WarehouseEventType";

export default class WarehouseEvent {
    readonly itemId: string;

    constructor(item: Item, readonly quantity: number, readonly eventType: WarehouseEventType, readonly createdAt: Date = new Date()) {
        this.itemId = item.id;
    }
}
