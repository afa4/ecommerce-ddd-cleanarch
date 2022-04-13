import EventLoopSubscriber from "../EventLoopSubscriber";
import { EventEmitter } from "events";
import OrderPlacedEvent from "../../../../../application/use-cases/place-order/OrderPlacedEvent";

export default class OrderPlacedEventSubscriber extends EventLoopSubscriber<OrderPlacedEvent> {
  constructor(eventEmitter: EventEmitter) {
    super(eventEmitter, {
      name: "ORDER_PLACED_EVENT",
      handle: (eventContent: OrderPlacedEvent) => {
        console.log("NODEJS EVENT SUBSCRIBER")
        return Promise.resolve();
      },
    });
  }
}
