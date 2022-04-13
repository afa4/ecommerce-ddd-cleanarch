export default interface DomainEventPublisher {
  publish(eventName: string, eventContent: any): void;
}