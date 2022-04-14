import DomainEventPublisher from '../../../../domain/events/DomainEventPublisher';
import {EventEmitter} from 'events';

export default class EventLoopPublisher implements DomainEventPublisher {

  constructor(private readonly eventEmitter: EventEmitter) {}

  publish(eventName: string, eventContent: any) {
    this.eventEmitter.emit(eventName, eventContent);
  }
}
