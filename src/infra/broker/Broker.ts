import Handler from "./Handler";
import DomainEvent from "./DomainEvent";

export default class Broker {
    private readonly handlers: Handler[];

    constructor() {
        this.handlers = [];
    }

    register(event: DomainEvent) {
        for(const handler of this.handlers) {
            if(event.name === handler.name) {
                handler.handle(event);
            }
        }
    }
}
