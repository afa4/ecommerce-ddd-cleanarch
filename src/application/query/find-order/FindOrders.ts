import UseCase from "../../use-cases/UseCase";
import FindOrdersOutput from './FindOrdersOutput';
import Connection from "../../../infra/database/Connection";

export default class FindOrders implements UseCase<void, FindOrdersOutput> {

    constructor(private readonly connection: Connection) {
    }

    async execute(input: void): Promise<FindOrdersOutput> {
        const ordersData: any[] = await this.connection.query("select * from order_", []);
        if (!ordersData) return new FindOrdersOutput([])
        let ordersResponse = ordersData.map(({code, issue_date, cpf}: any) => {
            return {code, cpf, issueDate: issue_date}
        });
        return Promise.resolve(new FindOrdersOutput(ordersResponse));
    }
}
