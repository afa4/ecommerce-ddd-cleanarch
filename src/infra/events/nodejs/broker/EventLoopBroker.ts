import {EventEmitter} from 'events';
import Handler from "../../Handler";
import DomainEventPublisher from "../../../../domain/events/DomainEventPublisher";
import DomainEvent from "../../../../domain/events/DomainEvent";

export default class EventLoopBroker implements DomainEventPublisher {
  constructor(private readonly eventEmitter: EventEmitter) {}

  register(handler: Handler) {
    this.eventEmitter.on(handler.eventName, async (event: DomainEvent) => {
      await handler.handle(event);
    })
  }

  publish(event: DomainEvent) {
    this.eventEmitter.emit(event.eventName, event);
  }
}
