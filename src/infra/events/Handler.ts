import DomainEvent from "../../domain/events/DomainEvent";

export default interface Handler {
    eventName: string;
    handle(event: DomainEvent): Promise<void>;
}
