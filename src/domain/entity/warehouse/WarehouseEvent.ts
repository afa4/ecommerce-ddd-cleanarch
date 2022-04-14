import Item from "../item/Item";
import {WarehouseEventType} from "./WarehouseEventType";

export default class WarehouseEvent {
    constructor(readonly itemId: number, readonly quantity: number, readonly eventType: WarehouseEventType, readonly createdAt: Date = new Date()) {}
}
