import Handler from "../../Handler";
import OrderPlacedEvent from "../../../../domain/events/OrderPlacedEvent";
import DecrementOrderItemsStock
    from "../../../../application/use-cases/decrement-order-items-stock/DecrementOrderItemsStock";

export default class OrderPlacedEventHandler implements Handler {
    eventName: string = 'OrderPlacedEvent';

    constructor(private readonly decrementOrderItemsStock: DecrementOrderItemsStock) {
    }

    async handle(event: OrderPlacedEvent): Promise<void> {
        await this.decrementOrderItemsStock.execute(event.order);
    }
}
