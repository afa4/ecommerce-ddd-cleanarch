import UseCase from "../UseCase";
import FindOrdersOutput from './FindOrdersOutput';
import OrderRepository from "../../../domain/repository/OrderRepository";

export default class FindOrders implements UseCase<void, FindOrdersOutput> {

    constructor(private readonly orderRepository: OrderRepository) {
    }

    async execute(input: void): Promise<FindOrdersOutput> {
        const orders = (await this.orderRepository.findAll())
            .map((order) => {
                return {code: order.getCode(), total: order.getTotal()}
            });
        return Promise.resolve(new FindOrdersOutput(orders));
    }
}
