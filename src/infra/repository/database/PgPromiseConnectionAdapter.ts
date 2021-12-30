import Connection from "./Connection";
import pgPromise, {IDatabase} from 'pg-promise';

export default class PgPromiseConnectionAdapter implements Connection {

    private readonly db: IDatabase<any>;

    constructor(connectionUri: string) {
        this.db = pgPromise()(connectionUri);
    }

    query(query: string, args: any[]): Promise<any> {
        return this.db.query(query, args);
    }

    async disconnect(): Promise<any> {
        await this.db.$pool.end();
    }
}
