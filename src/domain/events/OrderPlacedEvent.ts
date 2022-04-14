import Order from '../entity/order/Order'
import DomainEvent from "./DomainEvent";

export default class OrderPlacedEvent implements DomainEvent {
    eventName: string = 'OrderPlacedEvent';
    constructor(readonly order: Order) {}
}

