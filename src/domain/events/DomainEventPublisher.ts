import DomainEvent from "./DomainEvent";

export default interface DomainEventPublisher {
  publish(event: DomainEvent): void;
}
