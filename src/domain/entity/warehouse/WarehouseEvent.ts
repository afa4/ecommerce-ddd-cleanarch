import Item from "../item/Item";
import {WarehouseEventType} from "./WarehouseEventType";

export default class WarehouseEvent {
    readonly itemId: number;

    constructor(item: Item, readonly quantity: number, readonly eventType: WarehouseEventType, readonly createdAt: Date = new Date()) {
        this.itemId = item.id;
    }
}
