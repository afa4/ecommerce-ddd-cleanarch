import Handler from "../Handler";
import DomainEventPublisher from '../../../domain/events/DomainEventPublisher';
import DomainEvent from "../../../domain/events/DomainEvent";

export default class SyncEventsBroker implements DomainEventPublisher {
    constructor(private readonly handlers: Handler[]) {}

    async publish(domainEvent: DomainEvent): Promise<void>
    {
        for(let handler of this.handlers) {
            if(domainEvent.eventName === handler.eventName) {
                await handler.handle(domainEvent);
            }
        }
    }
}
