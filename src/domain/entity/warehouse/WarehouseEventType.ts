export enum WarehouseEventType{
    ITEM_IN = "ITEM_IN",
    ITEM_OUT = "ITEM_OUT"
}

export function warehouseEventTypeFromString(eventType: string): WarehouseEventType {
    switch (eventType) {
        case 'ITEM_IN':
            return WarehouseEventType.ITEM_IN
        case 'ITEM_OUT':
            return WarehouseEventType.ITEM_OUT
        default:
            throw new Error('Event type not recognized');
    }
}
