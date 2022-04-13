export default interface Handler<T> {
    name: string;
    handle(event: T): Promise<void>;
}
