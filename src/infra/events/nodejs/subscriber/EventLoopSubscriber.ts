import {EventEmitter} from 'events';
import Handler from '../../Handler';

export default class EventLoopSubscriber<T> {
  constructor(private readonly eventEmitter: EventEmitter, handler: Handler<T>) {
    eventEmitter.on(handler.name, (data) => {
      handler.handle(data);
    })
  }
}