import Handler from "../Handler";
import DomainEventPublisher from '../../../domain/events/DomainEventPublisher';

export default class SyncEventsBroker implements DomainEventPublisher {
    constructor(private readonly handlers: Handler<any>[]) {}
    
    async publish(eventName: string, eventContent: any): Promise<void>
    {
        for(let handler of this.handlers) {
            if(eventName === handler.name) {
                await handler.handle(eventContent);
            }
        }
    }
}
