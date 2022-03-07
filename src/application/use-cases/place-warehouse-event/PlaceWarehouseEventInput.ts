export default class ProcessWarehouseEventInput {
    constructor(readonly itemId: number, readonly quantity: number, readonly eventType: string) {
    }
}
