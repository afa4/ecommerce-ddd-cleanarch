export default interface Connection {
    query(query: string, args: any[]): Promise<any>;
    disconnect(): Promise<any>;
}
