import {EventEmitter} from 'events';

export default class EventLoopSubscriber {
  constructor(private readonly eventEmitter: EventEmitter) {}

  subscribe(eventName: string, handleFunction: (eventContent: any) => void) {
    this.eventEmitter.on(eventName, handleFunction)
  }
}