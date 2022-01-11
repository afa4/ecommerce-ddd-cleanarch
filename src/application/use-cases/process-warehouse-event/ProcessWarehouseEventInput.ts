export default class ProcessWarehouseEventInput {
    constructor(readonly itemId: string, readonly quantity: number, readonly eventType: string) {
    }
}
