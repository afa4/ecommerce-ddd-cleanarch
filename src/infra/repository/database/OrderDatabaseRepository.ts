import OrderRepository from "../../../domain/repository/OrderRepository";
import Order from "../../../domain/entity/Order";
import Connection from "../../database/Connection";

export default class OrderDatabaseRepository implements OrderRepository {

    constructor(private readonly connection: Connection) {
    }

    async findAll(): Promise<Order[]> {
        return Promise.resolve([]);
    }

    async findByCode(code: string): Promise<Order | undefined> {
        return Promise.resolve(undefined);
    }

    async getSequence(): Promise<number> {
        return Promise.resolve(0);
    }

    async save(order: Order): Promise<void> {
        // both queries should be in the same db transaction
        const query = "insert into ccca.order(coupon, cpf, issue_date, freight) values ($1, $2, $3, $4) returning *";
        const [orderData] = await this.connection.query(query, [
            order.getCoupon(),
            order.getCpf(),
            order.createdAt,
            order.getFreight()
        ]);

        const itemsQuery = "insert into ccca.order_item(id_order, id_item, price, quantity) values ";
        const valuesToInsert = [];
        for(let orderItem of order.getItems()) {
            const {itemId, price, quantity} = orderItem;
            valuesToInsert.push(`(${orderData.id_order}, ${itemId}, ${price}, ${quantity})`);
        }
        const valuesQuery = valuesToInsert.join(",");

        await this.connection.query(itemsQuery.concat(valuesQuery), []);
    }
}
